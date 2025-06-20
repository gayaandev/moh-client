import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally, you can add logic to re-fetch users after adding a new one
  };

  return (
    <AdminLayout
      modal={
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add New User">
          <UserForm onClose={handleCloseModal} />
        </Modal>
      }
    >
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Users Management</h2>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add New User
          </button>
        </div>
        {/* User list will be displayed here */}
        <p className="text-gray-600 text-lg">User management features will be available here.</p>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;