import { render, screen } from '@testing-library/react';
import { AppShell } from './AppShell';
import { BrowserRouter } from 'react-router-dom';
import * as Auth from '../../utils/auth';
import { UserRole } from '../../config/navigation';

// Mock the auth utility
jest.mock('../../utils/auth');

const mockGetDecodedToken = Auth.getDecodedToken as jest.Mock;

const renderWithRole = (role: UserRole) => {
  mockGetDecodedToken.mockReturnValue({ role });
  render(
    <BrowserRouter>
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    </BrowserRouter>
  );
};

describe('AppShell', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders common navigation items for all roles', () => {
    renderWithRole('Staff');
    expect(screen.getByText(/OYSIPA Investor CRM/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Investors/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
  });

  it('does not render admin links for Staff role', () => {
    renderWithRole('Staff');
    expect(screen.queryByText(/User Management/i)).not.toBeInTheDocument();
  });

  it('renders admin links for Portal Administrator role', () => {
    renderWithRole('Portal Administrator');
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
  });

  it('renders admin links for Director-General role', () => {
    renderWithRole('Director-General');
    expect(screen.getByText(/User Management/i)).toBeInTheDocument();
  });
});
