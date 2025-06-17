import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import SectionForm from '../components/SectionForm'; // Component for adding new sections
import SectionFormUpdate from '../components/SectionFormUpdate'; // Component for updating existing sections
import axios from 'axios';
import { GET_ALL_SECTIONS_URL, DELETE_SECTION_URL } from '../../../services/apis';
import toast from 'react-hot-toast'; // Import toast
import ConfirmationDialog from '../components/ConfirmationDialog'; // Import ConfirmationDialog

const AllSectionsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [sectionToDeleteId, setSectionToDeleteId] = useState(null);
  const [sectionToEditId, setSectionToEditId] = useState(null); // New state for editing
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpenModal = (id = null) => { // Accept optional ID
    setSectionToEditId(id); // Set the ID of the section to edit
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optionally re-fetch sections after closing modal if a new section might have been added
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.get(GET_ALL_SECTIONS_URL, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setSections(response.data))
        .catch(err => console.error('Error re-fetching sections:', err));
    }
  };

  const handleDeleteClick = (id) => {
    setSectionToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmDialogOpen(false);
    const id = sectionToDeleteId;
    setSectionToDeleteId(null); // Clear the ID

    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token not found. Please log in.');
      return;
    }

    try {
      await axios.delete(DELETE_SECTION_URL(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Section deleted successfully!');
      setSections(prevSections => prevSections.filter(section => section._id !== id));
    } catch (err) {
      toast.error('Failed to delete section. Please try again.');
      console.error('Error deleting section:', err);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogOpen(false);
    setSectionToDeleteId(null);
  };

  useEffect(() => {
    const fetchSections = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(GET_ALL_SECTIONS_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched sections:', response.data); // Log fetched data
        setSections(response.data);
      } catch (err) {
        setError('Failed to fetch sections. Please try again.');
        console.error('Error fetching sections:', err);
        console.error('Full error object:', err); // Log full error object
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);


  return (
    <AdminLayout
      modal={
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={sectionToEditId ? "Edit Section" : "Add New Section"}>
          {sectionToEditId ? (
            <SectionFormUpdate sectionId={sectionToEditId} onClose={handleCloseModal} />
          ) : (
            <SectionForm onClose={handleCloseModal} />
          )}
        </Modal>
      }
    >
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">All Sections</h2>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add New Section
          </button>
        </div>

        {loading && <p className="text-gray-600">Loading sections...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.length > 0 ? (
              sections.map((section) => (
                <div key={section._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{section.section_name}</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Type:</span> {section.section_type}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-medium">Category:</span> {section.category || 'N/A'}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleOpenModal(section._id)}
                      className="px-4 py-2 bg-[#4988d4] text-white rounded-md hover:bg-[#3a70b0] focus:outline-none focus:ring-2 focus:ring-[#4988d4] focus:ring-opacity-50 text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(section._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No sections found.
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        message="Are you sure you want to delete this section?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AdminLayout>
  );
};

export default AllSectionsPage;