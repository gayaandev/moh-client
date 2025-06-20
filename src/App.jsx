import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/public/pages/HomePage';
import DashboardPage from './components/admin/pages/DashboardPage';
import SiteSettingsPage from './components/admin/pages/SiteSettingsPage';
import SectionsPage from './components/admin/pages/SectionsPage';
import AllSectionsPage from './components/admin/pages/AllSectionsPage'; // Import AllSectionsPage
import AllMenuItemsPage from './components/admin/pages/AllMenuItemsPage'; // Import AllMenuItemsPage
import LoginPage from './components/admin/pages/LoginPage'; // Import LoginPage
import UsersPage from './components/admin/pages/UsersPage'; // Import UsersPage
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider and useAuth
import PublicLayout from './components/public/components/PublicLayout';

// ProtectedRoute component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Optionally, redirect to an unauthorized page or show an error
    return <Navigate to="/unauthorized" replace />; // You might want to create an UnauthorizedPage
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider> {/* Wrap the entire application with AuthProvider */}
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            {/* Add other public routes here */}

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'editor']}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/site-settings"
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'editor']}>
                  <SiteSettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/all-sections"
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'editor']}>
                  <AllSectionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/all-menu-items"
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'editor']}>
                  <AllMenuItemsPage />
                </ProtectedRoute>
              }
            />
            {/* Users Route */}
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'editor']}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            {/* Add other protected admin routes here */}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Minor change to force re-render
export default App;
