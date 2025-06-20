import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Edit3, Layers, Type, Eye, EyeOff } from 'lucide-react'; // Import icons
import { REGISTER_URL, GET_SINGLE_USER_URL, UPDATE_USER_URL } from '../../../services/apis'; // Import necessary APIs

const UserForm = ({ onClose, userId }) => { // Accept userId prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('editor'); // Default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Fetch user data if userId is provided (for editing)
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        setLoading(true);
        setError(null);
        const token = sessionStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found. Please log in.');
          setLoading(false);
          return;
        }

        try {
          const response = await axios.get(GET_SINGLE_USER_URL(userId), {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = response.data.data.user; // Assuming response structure
          setUsername(userData.username || '');
          setRole(userData.role || 'editor');
          // Password field is typically not pre-filled for security reasons
        } catch (err) {
          setError('Failed to fetch user data. Check console for details.');
          console.error('Error fetching user data:', err);
          toast.error('Failed to fetch user data.');
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const url = userId ? UPDATE_USER_URL(userId) : REGISTER_URL;
      const method = userId ? 'put' : 'post';
      const successMessage = userId ? 'User updated successfully!' : 'User created successfully!';

      await axios[method](
        url,
        { username, password, role }, // Password might be optional for update if not changing
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(successMessage);
      if (onClose) {
        onClose();
      }
    } catch (err) {
      const errorMessage = userId ? 'Failed to update user.' : 'Failed to create user.';
      toast.error(`${errorMessage} Check console for details.`);
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      {/* Username Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
          Username
        </label>
        <div className="mt-1 relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Edit3 className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
            required
            placeholder="Enter username"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
          Password
        </label>
        <div className="mt-1 relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
            )}
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
            required
            placeholder="Enter password"
          />
        </div>
      </div>

      {/* Role Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="role">
          Role
        </label>
        <div className="mt-1 relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Type className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
          >
            <option value="editor">Editor</option>
            {/* Add other roles as needed, but prevent superadmin creation from here */}
          </select>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">Error: {error}</p>}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="text-white px-6 py-2 rounded-md text-lg font-semibold bg-[#4988d4] hover:bg-[#3a70b0] focus:outline-none focus:ring-2 focus:ring-[#4988d4] focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Submitting...' : (userId ? 'Update User' : 'Create User')}
        </button>
      </div>
    </form>
  );
};

export default UserForm;