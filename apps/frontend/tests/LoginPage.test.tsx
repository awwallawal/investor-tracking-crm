import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../src/components/Auth/LoginPage';
import { getApiBaseUrl } from '../src/utils/env';
import axios from 'axios';

// -----------------------------
// MOCKS
// -----------------------------

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../src/utils/auth');

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../src/utils/env');
(getApiBaseUrl as jest.Mock).mockReturnValue('http://localhost:3000');

// -----------------------------
// TESTS
// -----------------------------
describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders login form correctly', () => {
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('allows typing into fields', async () => {
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    await userEvent.type(email, 'test@example.com');
    await userEvent.type(password, 'password123');
    expect(email).toHaveValue('test@example.com');
    expect(password).toHaveValue('password123');
  });

  it('handles successful login', async () => {
    const token = 'fake-jwt-token';
    mockedAxios.post.mockResolvedValue({ data: { token } });
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    render(<MemoryRouter><LoginPage /></MemoryRouter>);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith('authToken', token);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles failed login and displays error', async () => {
    mockedAxios.post.mockRejectedValue({ response: { data: { message: 'Some error' } } });

    render(<MemoryRouter><LoginPage /></MemoryRouter>);

    await userEvent.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();
    });

    expect(localStorage.getItem('authToken')).toBeNull();
  });
});
