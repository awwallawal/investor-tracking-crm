import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export type UserRole = 'Staff' | 'Portal Administrator' | 'Director-General';

interface NavLink {
  text: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const allNavLinks: NavLink[] = [
  {
    text: 'Dashboard',
    path: '/dashboard',
    icon: DashboardIcon,
    roles: ['Staff', 'Portal Administrator', 'Director-General'],
  },
  {
    text: 'Investors',
    path: '/investors',
    icon: PeopleIcon,
    roles: ['Staff', 'Portal Administrator', 'Director-General'],
  },
  {
    text: 'Projects',
    path: '/projects',
    icon: WorkIcon,
    roles: ['Staff', 'Portal Administrator', 'Director-General'],
  },
  {
    text: 'User Management',
    path: '/admin/users',
    icon: AdminPanelSettingsIcon,
    roles: ['Portal Administrator', 'Director-General'],
  },
];

export const getNavLinks = (role: UserRole): NavLink[] => {
  return allNavLinks.filter(link => link.roles.includes(role));
};
