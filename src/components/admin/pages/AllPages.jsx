import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import PageForm from '../components/PageForm'; // Component for adding/editing pages
import axios from 'axios';
import { GET_ALL_PAGES_URL, DELETE_PAGE_URL } from '../../../services/apis';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { Edit3, X } from 'lucide-react';

const AllPages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageToEditId, setPageToEditId] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pageToDeleteId, setPageToDeleteId] = useState(null);

  const handleOpenModal = (id = null) => {
    setPageToEditId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPageToEditId(null);
    fetchPages();
  };

  const fetchPages = async () => {
    setLoading(true);
    setError(null);
    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(GET_ALL_PAGES_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPages(response.data);
    } catch (err) {
      setError('Failed to fetch pages. Please try again.');
      console.error('Error fetching pages:', err);
      toast.error('Failed to fetch pages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDeleteClick = (id) => {
    setPageToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmDialogOpen(false);
    const id = pageToDeleteId;
    setPageToDeleteId(null);

    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token not found. Please log in.');
      return;
    }

    try {
      await axios.delete(DELETE_PAGE_URL(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Page deleted successfully!');
      setPages(prevPages => prevPages.filter(page => page._id !== id));
    } catch (err) {
      toast.error('Failed to delete page. Please try again.');
      console.error('Error deleting page:', err);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogOpen(false);
    setPageToDeleteId(null);
  };

  return (
    <AdminLayout
      modal={
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={pageToEditId ? "Edit Page" : "Add New Page"}>
          <PageForm onClose={handleCloseModal} pageId={pageToEditId} />
        </Modal>
      }
    >
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">All Pages</h2>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add New Page
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pages.length > 0 ? (
                  pages.map((page) => (
                    <tr key={page._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.slug}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                        <button onClick={() => handleOpenModal(page._id)} className="text-blue-500 hover:text-blue-700">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => handleDeleteClick(page._id)} className="text-red-500 hover:text-red-700">
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No pages found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        message="Are you sure you want to delete this page?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AdminLayout>
  );
};

export default AllPages;