import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import axios from 'axios';
import { GET_USERS_URL, DELETE_USER_URL } from '../../../services/apis'; // Assuming GET_USERS_URL and DELETE_USER_URL are defined
import toast from 'react-hot-toast';
import ConfirmationDialog from '../components/ConfirmationDialog'; // Import ConfirmationDialog
import { Edit3, X } from 'lucide-react'; // Import icons for edit/delete

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userToEditId, setUserToEditId] = useState(null); // State for editing
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // State for confirmation dialog
  const [userToDeleteId, setUserToDeleteId] = useState(null); // State for user to delete

  const handleOpenModal = (id = null) => {
    setUserToEditId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserToEditId(null);
    // Re-fetch users after closing modal if a new user might have been added/edited
    fetchUsers();
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(GET_USERS_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.data.users); // Assuming response structure
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error('Error fetching users:', err);
      toast.error('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    setUserToDeleteId(userId);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmDialogOpen(false);
    const id = userToDeleteId;
    setUserToDeleteId(null); // Clear the ID

    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token not found. Please log in.');
      return;
    }

    try {
      await axios.delete(DELETE_USER_URL(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User deleted successfully!');
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
    } catch (err) {
      toast.error('Failed to delete user. Please try again.');
      console.error('Error deleting user:', err);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogOpen(false);
    setUserToDeleteId(null);
  };

  return (
    <AdminLayout
      modal={
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={userToEditId ? "Edit User" : "Add New User"}>
          {/* If userToEditId is set, pass it to UserForm for editing */}
          <UserForm onClose={handleCloseModal} userId={userToEditId} />
        </Modal>
      }
    >
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Users Management</h2>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add New User
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                        <button
                          onClick={() => handleOpenModal(user._id)}
                          className={`text-blue-500 hover:text-blue-700 ${user.role === 'superadmin' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={user.role === 'superadmin'}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)} // This will now trigger the confirmation dialog
                          className={`text-red-500 hover:text-red-700 ${user.role === 'superadmin' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={user.role === 'superadmin'}
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        message="Are you sure you want to delete this user?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AdminLayout>
  );
};

export default UsersPage;