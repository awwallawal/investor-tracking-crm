import { render, screen, fireEvent, act } from '@testing-library/react';
import UserManagementPage from './UserManagementPage';
import { api } from '../../utils/api';

// Mock the api utility using Jest
jest.mock('../../utils/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('UserManagementPage', () => {
  beforeEach(() => {
    // Provide mock data for the initial fetch
    (api.get as jest.Mock).mockResolvedValue({
      data: [
        { _id: '1', name: 'Test User', email: 'test@example.com', role: 'Staff', status: 'Active' },
      ],
    });
  });

  it('renders the user table', async () => {
    await act(async () => {
      render(<UserManagementPage />);
    });
    expect(await screen.findByText('Test User')).toBeInTheDocument();
  });

  it('opens the invite dialog', async () => {
    await act(async () => {
      render(<UserManagementPage />);
    });
    fireEvent.click(screen.getByText('Invite User'));
    expect(screen.getByText('Invite New User')).toBeInTheDocument();
  });

  it('opens the revoke dialog', async () => {
    await act(async () => {
      render(<UserManagementPage />);
    });
    const revokeButton = await screen.findByRole('button', { name: /revoke/i });
    fireEvent.click(revokeButton);
    expect(screen.getByText('Revoke Access?')).toBeInTheDocument();
  });
});
