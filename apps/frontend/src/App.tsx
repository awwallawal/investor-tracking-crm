// src/App.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Auth/LoginPage';
import DashboardPage from './components/Dashboard/DashboardPage';
import InvestorsPage from './components/Investors/InvestorsPage';
import ProjectsPage from './components/Projects/ProjectsPage';
import UserManagementPage from './components/Admin/UserManagementPage';
import { AppShell } from './components/Layout/AppShell';
import { ProtectedRoute } from './components/Auth/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Staff', 'Portal Administrator', 'Director-General']}>
            <AppShell>
              <DashboardPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/investors"
        element={
          <ProtectedRoute allowedRoles={['Staff', 'Portal Administrator', 'Director-General']}>
            <AppShell>
              <InvestorsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute allowedRoles={['Staff', 'Portal Administrator', 'Director-General']}>
            <AppShell>
              <ProjectsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['Portal Administrator', 'Director-General']}>
            <AppShell>
              <UserManagementPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          localStorage.getItem('authToken') ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
