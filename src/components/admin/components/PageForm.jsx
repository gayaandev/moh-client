import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CREATE_PAGE_URL, GET_SINGLE_PAGE_URL, UPDATE_PAGE_URL, GET_ALL_SECTIONS_URL } from '../../../services/apis';
import { Edit3, Type, X } from 'lucide-react';
import Select from 'react-select';

const PageForm = ({ onClose, pageId }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [sectionAssignedIds, setSectionAssignedIds] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get(GET_ALL_SECTIONS_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllSections(response.data);
      } catch (err) {
        console.error('Error fetching sections:', err);
        toast.error('Failed to fetch sections.');
      }
    };
    fetchSections();
  }, []);

  useEffect(() => {
    if (pageId) {
      const fetchPageData = async () => {
        setLoading(true);
        setError(null);
        const token = sessionStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found. Please log in.');
          setLoading(false);
          return;
        }

        try {
          const response = await axios.get(GET_SINGLE_PAGE_URL(pageId), {
            headers: { Authorization: `Bearer ${token}` },
          });

          const pageData = response.data;
          setTitle(pageData.title || '');
          setSlug(pageData.slug || '');
          const assignedSections = pageData.section_assigned_ids.map(s => ({ section: s.section._id, order: s.order }));
          setSectionAssignedIds(assignedSections || []);
        } catch (err) {
          setError('Failed to fetch page data. Check console for details.');
          console.error('Error fetching page data:', err);
          toast.error('Failed to fetch page data.');
        } finally {
          setLoading(false);
        }
      };
      fetchPageData();
    }
  }, [pageId]);

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
      const url = pageId ? UPDATE_PAGE_URL(pageId) : CREATE_PAGE_URL;
      const method = pageId ? 'put' : 'post';
      const successMessage = pageId ? 'Page updated successfully!' : 'Page created successfully!';

      const payload = {
        title,
        slug,
        section_assigned_ids: sectionAssignedIds,
      };

      console.log('Payload:', payload); // Add this line for debugging

      await axios[method](
        url,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(successMessage);
      if (onClose) {
        onClose();
      }
    } catch (err) {
      const errorMessage = pageId ? 'Failed to update page.' : 'Failed to create page.';
      toast.error(`${errorMessage} Check console for details.`);
      setError(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSection = (selectedOption) => {
    if (selectedOption && !sectionAssignedIds.some(s => s.section === selectedOption.value)) {
      const newSection = {
        section: selectedOption.value,
        order: sectionAssignedIds.length + 1,
      };
      setSectionAssignedIds([...sectionAssignedIds, newSection]);
    }
  };

  const handleRemoveSection = (sectionId) => {
    const newSections = sectionAssignedIds
      .filter(s => s.section !== sectionId)
      .map((s, index) => ({ ...s, order: index + 1 }));
    setSectionAssignedIds(newSections);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
          Title
        </label>
        <div className="mt-1 relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Type className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
            required
            placeholder="Enter page title"
          />
        </div>
      </div>

      {/* Slug Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="slug">
          Slug
        </label>
        <div className="mt-1 relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Edit3 className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
            required
            placeholder="Enter page slug (e.g., about-us)"
          />
        </div>
      </div>

      {/* Sections Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="sections">
          Search and Add Sections
        </label>
        <Select
          options={allSections.map(section => ({ value: section._id, label: section.section_name }))}
          onChange={handleAddSection}
          className="mt-1"
          classNamePrefix="select"
          placeholder="Search and add sections"
          value={null}
        />
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned Sections:</h4>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sectionAssignedIds.map(({ section, order }) => {
                const sectionData = allSections.find(s => s._id === section);
                return (
                  <tr key={section}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sectionData?.section_name || 'Unknown Section'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sectionData?.section_type || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(section)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">Error: {error}</p>}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="text-white px-6 py-2 rounded-md text-lg font-semibold bg-[#4988d4] hover:bg-[#3a70b0] focus:outline-none focus:ring-2 focus:ring-[#4988d4] focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Submitting...' : (pageId ? 'Update Page' : 'Create Page')}
        </button>
      </div>
    </form>
  );
};

export default PageForm;