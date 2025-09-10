import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from './ProtectedRoute';
import { MemoryRouter } from 'react-router-dom';
import * as Auth from '../../../utils/auth';

// Mock the auth utility
jest.mock('../../../utils/auth');
const mockGetDecodedToken = Auth.getDecodedToken as jest.Mock;

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  Navigate: ({ to }: { to: string }) => `Navigate to: ${to}`,
}));

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('redirects to login if not authenticated', () => {
    localStorage.removeItem('authToken');
    mockGetDecodedToken.mockReturnValue(null);

    render(
      <MemoryRouter>
        <ProtectedRoute><div>Protected Content</div></ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Navigate to: /login')).toBeInTheDocument();
  });

  it('renders children if authenticated and no roles are specified', () => {
    localStorage.setItem('authToken', 'fake-token');
    mockGetDecodedToken.mockReturnValue({ role: 'Staff' });

    render(
      <MemoryRouter>
        <ProtectedRoute><div>Protected Content</div></ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Navigate to: /login')).not.toBeInTheDocument();
  });

  it('renders children if authenticated and role is allowed', () => {
    localStorage.setItem('authToken', 'fake-token');
    mockGetDecodedToken.mockReturnValue({ role: 'Portal Administrator' });

    render(
      <MemoryRouter>
        <ProtectedRoute allowedRoles={['Portal Administrator', 'Director-General']}>
          <div>Admin Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Content')).toBeInTheDocument();
    expect(screen.queryByText('Navigate to: /dashboard')).not.toBeInTheDocument();
  });

  it('redirects to dashboard if authenticated but role is not allowed', () => {
    localStorage.setItem('authToken', 'fake-token');
    mockGetDecodedToken.mockReturnValue({ role: 'Staff' });

    render(
      <MemoryRouter>
        <ProtectedRoute allowedRoles={['Portal Administrator', 'Director-General']}>
          <div>Admin Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Navigate to: /dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
  });
});
