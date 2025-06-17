import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import SectionForm from '../components/SectionForm'; // The component to show in the modal

const AllSectionsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AdminLayout
      modal={
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add/Edit Section">
          <SectionForm />
        </Modal>
      }
    >
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">All Sections</h2>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add New Section
          </button>
        </div>

        {/* Placeholder for listing sections - will be implemented later */}
        <div className="border border-gray-200 rounded-md p-4">
          <p className="text-gray-600">Section list will go here...</p>
          {/* Example:
          <ul>
            <li>Section 1</li>
            <li>Section 2</li>
          </ul>
          */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllSectionsPage;