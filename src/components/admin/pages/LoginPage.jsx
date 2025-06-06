import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { ADMIN_LOGIN_URL } from '../../../services/apis'; // Adjust path as needed
import { useAuth } from '../../../context/AuthContext'; // Will create this context later
import mohLogo from '../../../assets/moh-logo.png'; // Import the logo

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login function from AuthContext
  
  // Load saved credentials from localStorage on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('admin_username');
    const savedPassword = localStorage.getItem('admin_password');
    const savedRememberMe = localStorage.getItem('admin_remember_me') === 'true';
    
    if (savedUsername && savedPassword && savedRememberMe) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(ADMIN_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save credentials to localStorage if "Remember me" is checked
        if (rememberMe) {
          localStorage.setItem('admin_username', username);
          localStorage.setItem('admin_password', password);
          localStorage.setItem('admin_remember_me', 'true');
        } else {
          // Clear saved credentials if "Remember me" is unchecked
          localStorage.removeItem('admin_username');
          localStorage.removeItem('admin_password');
          localStorage.removeItem('admin_remember_me');
        }
        
        login(data.token, data.data.user); // Use the login function from AuthContext
        navigate('/admin'); // Redirect to admin dashboard on successful login
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <style jsx>{`
          ::placeholder {
            color: #9ca3af;
            opacity: 1;
          }
        `}</style>
        <div className="flex justify-center mb-8">
          <img src={mohLogo} alt="MOH Logo" className="h-20 w-auto" />
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">Login</h2>
        {error && <p className="text-red-600 text-center mb-6 font-medium">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200 ease-in-out text-gray-800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200 ease-in-out text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-500" />
                ) : (
                  <Eye size={20} className="text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-secondary text-white font-bold text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition duration-300 ease-in-out"
            style={{ backgroundColor: '#4988d4' }}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;