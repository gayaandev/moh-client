import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/public/pages/Home/HomePage';
import DashboardPage from './components/admin/pages/DashboardPage';
import SiteSettingsPage from './components/admin/pages/SiteSettingsPage';
import SectionsPage from './components/admin/pages/SectionsPage';
import AllSectionsPage from './components/admin/pages/AllSectionsPage'; // Import AllSectionsPage
import AllMenuItemsPage from './components/admin/pages/AllMenuItemsPage'; // Import AllMenuItemsPage
import AllPages from './components/admin/pages/AllPages'; // Import AllPages
import LoginPage from './components/admin/pages/LoginPage'; // Import LoginPage
import UsersPage from './components/admin/pages/UsersPage'; // Import UsersPage
import ContactPage from './components/public/pages/Contact/ContactPage'; // Import ContactPage
import KMTIPage from './components/public/pages/KMTI/KMTIPage'; // Import KMTIPage
import OverviewPage from './components/public/pages/About/OverviewPage'; // Import OverviewPage
import OrganogramPage from './components/public/pages/About/OrganogramPage'; // Import OrganogramPage
import MissionAndVisionPage from './components/public/pages/About/MissionAndVisionPage'; // Import MissionAndVisionPage
import DepartmentAdminFinanceHRPage from './components/public/pages/Departments/DepartmentAdminFinanceHRPage'; // Import DepartmentAdminFinanceHRPage
import DepartmentMedicalServicePage from './components/public/pages/Departments/DepartmentMedicalServicePage'; // Import DepartmentMedicalServicePage
import DepartmentHealthEmergencyPage from './components/public/pages/Departments/DepartmentHealthEmergencyPage'; // Import DepartmentHealthEmergencyPage
import DepartmentFamilyHealthPage from './components/public/pages/Departments/DepartmentFamilyHealthPage'; // Import DepartmentFamilyHealthPage
import DepartmentPublicHealthPage from './components/public/pages/Departments/DepartmentPublicHealthPage'; // Import DepartmentPublicHealthPage
import DepartmentMentalHealthPage from './components/public/pages/Departments/DepartmentMentalHealthPage'; // Import DepartmentMentalHealthPage
import DamalCaafimadPage from './components/public/pages/Departments/projects/DamalCaafimadPage';
import MarwoCaafimaadPage from './components/public/pages/Departments/projects/MarwoCaafimaadPage';
import UnderConstructionPage from './components/public/pages/Portal/UnderConstructionPage';
import ReportsPage from './components/public/pages/Reports/ReportsPage';
import PolicyPage from './components/public/pages/Policy/PolicyPage';
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
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/kmti" element={<PublicLayout><KMTIPage /></PublicLayout>} />
            <Route path="/overview" element={<PublicLayout><OverviewPage /></PublicLayout>} />
            <Route path="/organogram" element={<PublicLayout><OrganogramPage /></PublicLayout>} />
            <Route path="/vision-and-mission" element={<PublicLayout><MissionAndVisionPage /></PublicLayout>} />
            <Route path="/admin-finance-and-human-resource-department" element={<PublicLayout><DepartmentAdminFinanceHRPage /></PublicLayout>} />
            <Route path="/medical-service-department" element={<PublicLayout><DepartmentMedicalServicePage /></PublicLayout>} />
            <Route path="/health-emergency-department" element={<PublicLayout><DepartmentHealthEmergencyPage /></PublicLayout>} />
            <Route path="/family-health-department" element={<PublicLayout><DepartmentFamilyHealthPage /></PublicLayout>} />
            <Route path="/public-health-department" element={<PublicLayout><DepartmentPublicHealthPage /></PublicLayout>} />
            <Route path="/mental-health-department" element={<PublicLayout><DepartmentMentalHealthPage /></PublicLayout>} />
            <Route path="/damal-caafimaad" element={<PublicLayout><DamalCaafimadPage /></PublicLayout>} />
            <Route path="/marwo-caafimaad" element={<PublicLayout><MarwoCaafimaadPage /></PublicLayout>} />
            <Route path="/reports" element={<PublicLayout><ReportsPage /></PublicLayout>} />
            <Route path="/policy" element={<PublicLayout><PolicyPage /></PublicLayout>} />
            
            {/* Portal Routes */}
            <Route path="/asset-register-system" element={<UnderConstructionPage />} />
            <Route path="/health-facility-registration-system" element={<UnderConstructionPage />} />
            <Route path="/health-professional-registry-system" element={<UnderConstructionPage />} />
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
            {/* All Pages Route */}
            <Route
              path="/admin/all-pages"
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'editor']}>
                  <AllPages />
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
