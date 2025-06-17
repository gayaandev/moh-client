import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // Import useAuth
import mohLogo from '../../../assets/moh-logo.png'; // Import the logo
import {
  Home,
  Settings,
  FileText,
  Folder,
  Calendar,
  BarChart3,
  User,
  Search,
  Bell,
  ChevronDown,
  Globe, // For Site
  Menu, // For Menu
  LayoutGrid, // For Sections
  File, // For Pages
  Users, // For User (already imported, but good to be explicit)
  LogOut // For Logout
} from 'lucide-react';
import { Toaster } from 'react-hot-toast'; // Import Toaster

const AdminLayout = ({ children, modal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  // Determine if the admin dropdown should be open
  const isAdminDropdownOpen = ['/admin/site-settings', '/admin/sections'].some(path => location.pathname.startsWith(path));

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Function to check if user has superadmin role
  const isSuperAdmin = user && user.role === 'superadmin';
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Modern Dark Navy */}
      <aside className="w-64 flex flex-col bg-[#1a1f2e] text-gray-100 transition-all duration-300 ease-in-out">
        <div className="p-6 text-2xl font-bold flex items-center justify-center">
          <img src={mohLogo} alt="MOH Logo" className="h-16 w-auto" />
        </div>
        <div className="flex-1 px-4 py-2 overflow-y-auto"> {/* Added flex-1 and overflow-y-auto */}
          <nav>
            <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3 ml-2">MAIN</h2>
            <ul className="space-y-1">
              <li>
                <Link to="/admin" className="flex items-center p-3 rounded-md text-white font-medium" style={{ backgroundColor: '#4988d4' }}>
                  <Home className="mr-3" size={18} />
                  Dashboard
                </Link>
              </li>
              <li>
                <details className="group" open={isAdminDropdownOpen}>
                  <summary className="flex items-center p-3 rounded-md text-[#99A1AF] hover:bg-[#252b3b] hover:text-white transition-colors duration-200 cursor-pointer">
                    <Settings className="mr-3" size={18} />
                    <span>Admin</span>
                    <ChevronDown className="ml-auto group-open:rotate-180 transition-transform duration-200" size={16} />
                  </summary>
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>
                      <Link to="/admin/site-settings" className="flex items-center p-2 rounded-md text-[#99A1AF] hover:bg-[#252b3b] hover:text-white transition-colors duration-200">
                        <Globe className="mr-3" size={16} />
                        <span>Site</span>
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="flex items-center p-2 rounded-md text-[#99A1AF] hover:bg-[#252b3b] hover:text-white transition-colors duration-200">
                        <Menu className="mr-3" size={16} />
                        <span>Menus</span>
                      </a>
                    </li>
                    <li>
                      <Link to="/admin/all-sections" className="flex items-center p-2 rounded-md text-[#99A1AF] hover:bg-[#252b3b] hover:text-white transition-colors duration-200">
                        <LayoutGrid className="mr-3" size={16} />
                        <span>Sections</span>
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="flex items-center p-2 rounded-md text-[#99A1AF] hover:bg-[#252b3b] hover:text-white transition-colors duration-200">
                        <File className="mr-3" size={16} />
                        <span>Pages</span>
                      </a>
                    </li>
                    {isSuperAdmin && ( // Conditionally render based on role
                      <li>
                        <a href="#" className="flex items-center p-2 rounded-md text-[#99A1AF] hover:bg-[#252b3b] hover:text-white transition-colors duration-200">
                          <Users className="mr-3" size={16} />
                          <span>Users</span>
                        </a>
                      </li>
                    )}
                  </ul>
                </details>
              </li>
            </ul>
            <h2 className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-3 ml-2">CONTENT</h2>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center p-3 rounded-md text-[#99A1AF] hover:bg-[#252b3b] hover:text-white transition-colors duration-200">
                  <FileText className="mr-3" size={18} />
                  <span>News Posts</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 rounded-md text-[#99A1AF] hover:bg-[#252b3b] hover:text-white transition-colors duration-200">
                  <Folder className="mr-3" size={18} />
                  <span>Projects</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 rounded-md text-[#99A1AF] hover:bg-[#252b3b] hover:text-white transition-colors duration-200">
                  <Calendar className="mr-3" size={18} />
                  <span>Events</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-3 rounded-md text-[#99A1AF] hover:bg-[#252b3b] hover:text-white transition-colors duration-200">
                  <BarChart3 className="mr-3" size={18} />
                  <span>Reports</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#252b3b] rounded-full flex items-center justify-center mr-3">
              <User className="text-gray-300" size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Admin User</div>
              <div className="text-xs text-gray-400">Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Light */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="text-xl text-gray-800">
            <span className="font-semibold">Home</span> <span className="text-gray-400">/</span> <span className="font-normal">{location.pathname.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={22} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <div className="relative">
              <div
                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <User className="text-blue-600" size={18} />
              </div>
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="mr-2" size={16} />
                    Account
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut className="mr-2" size={16} />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
      {modal} {/* Render the modal here, outside the main content area */}
      <Toaster /> {/* Add Toaster component here */}
    </div>
  );
};

export default AdminLayout;