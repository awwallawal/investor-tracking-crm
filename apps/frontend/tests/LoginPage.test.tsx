import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import App from '../src/App'; // Import App component
import LoginPage from '../src/components/Auth/LoginPage';
import * as Auth from '../src/utils/auth';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock auth utility
jest.mock('../src/utils/auth');
const mockGetDecodedToken = Auth.getDecodedToken as jest.Mock;

// Mock react-router-dom
const mockedUsedNavigate = jest.fn();
const mockedUsedLocation = jest.fn(() => ({ pathname: '/' }));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => mockedUsedLocation(),
}));

describe('Login and Logout Flow', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    mockedUsedNavigate.mockClear();
    mockedUsedLocation.mockClear();
    // Clear localStorage
    localStorage.clear();
  });

  it('renders the login form with email and password fields', () => {
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('allows the user to type into email and password fields', async () => {
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
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

  it('handles failed login and displays an error message', async () => {
    const errorMessage = 'Invalid credentials';
    mockedAxios.post.mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    render(<MemoryRouter><LoginPage /></MemoryRouter>);

    await userEvent.type(screen.getByLabelText(/email/i), 'wrong@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('An unexpected error occurred.')).toBeInTheDocument();
    });

    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('handles logout successfully', async () => {
    // Simulate a logged-in state
    localStorage.setItem('authToken', 'test-token');
    mockGetDecodedToken.mockReturnValue({ role: 'Staff' }); // Mock the token decode

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    // Render the entire App component, which includes routing logic
    render(<MemoryRouter initialEntries={['/dashboard']}><App /></MemoryRouter>);

    // Expect to be on the dashboard page initially
    expect(screen.getByText(/Welcome to the Dashboard!/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    await waitFor(() => {
      expect(removeItemSpy).toHaveBeenCalledWith('authToken');
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
