import React, { useState } from 'react';
import axios from 'axios';
import { CREATE_SECTION_URL, UPDATE_SECTION_URL } from '../../../services/apis';
import { FileText, Heading1, Type, Tag, Edit3, Layers, Link as LinkIcon, Image as ImageIcon, MousePointerClick } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const SectionForm = ({ onClose }) => { // Add onClose prop
  const [sectionData, setSectionData] = useState({
    section_type: "", // Required, user must fill
    section_name: "", // Required, user must fill for new
    category: "",
    header: "Default Section Header",
    subheader: "Default Section Subheader",
    columns: {
      column1: { content: "", links: [], images: [], buttons: [] },
      column2: { content: "", links: [], images: [], buttons: [] },
      column3: { content: "", links: [], images: [], buttons: [] },
    },
  });
  const [loading, setLoading] = useState(false); // No initial loading for fetch
  const [error, setError] = useState(null);
  const [isNewSection, setIsNewSection] = useState(true); // Always true for this component

  // State for new link inputs (generic for any column)
  const [newLinkInputs, setNewLinkInputs] = useState({
    column1: { title: '', url: '' },
    column2: { title: '', url: '' },
    column3: { title: '', url: '' },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSectionData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));

      if (name === "section_type") newData.section_type = value;
      else if (name === "section_name") newData.section_name = value;
      else if (name === "category") newData.category = value;
      else if (name === "header") newData.header = value;
      else if (name === "subheader") newData.subheader = value;
      else if (name.startsWith("column") && name.endsWith("_content")) {
        const colName = name.split('_')[0];
        if (!newData.columns[colName]) newData.columns[colName] = { content: "", links: [], images: [], buttons: [] };
        newData.columns[colName].content = value;
      }
      else if (name.startsWith("column") && name.endsWith("_images")) {
        const colName = name.split('_')[0];
        if (!newData.columns[colName]) newData.columns[colName] = { content: "", links: [], images: [], buttons: [] };
        newData.columns[colName].images = value.split(',').map(s => s.trim()).filter(s => s);
      }
      else if (name.startsWith("column") && name.endsWith("_buttons")) {
        const colName = name.split('_')[0];
        if (!newData.columns[colName]) newData.columns[colName] = { content: "", links: [], images: [], buttons: [] };
        newData.columns[colName].buttons = value.split(',').map(s => s.trim()).filter(s => s);
      }
      return newData;
    });
  };

  const handleNewLinkInputChange = (columnName, field, value) => {
    setNewLinkInputs(prev => ({
      ...prev,
      [columnName]: {
        ...prev[columnName],
        [field]: value
      }
    }));
  };

  const handleAddLink = (columnName) => {
    const { title, url } = newLinkInputs[columnName];
    if (title && url) {
      setSectionData(prev => {
        const newData = JSON.parse(JSON.stringify(prev));
        if (!newData.columns[columnName]) newData.columns[columnName] = { links: [], content: "", images: [], buttons: [] };
        newData.columns[columnName].links.push({ title, url });
        return newData;
      });
      setNewLinkInputs(prev => ({
        ...prev,
        [columnName]: { title: '', url: '' }
      }));
    }
  };

  const handleRemoveLink = (columnName, index) => {
    setSectionData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (newData.columns[columnName] && newData.columns[columnName].links) {
        newData.columns[columnName].links.splice(index, 1);
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Ensure sectionData is not null before proceeding
    if (!sectionData) {
      setError("Section data is not initialized.");
      setLoading(false);
      return;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in.');
      setLoading(false);
      return;
    }

    // Validation: section_type is UI-required
    if (!sectionData.section_type) {
      setError("Section Type is required.");
      setLoading(false);
      return;
    }
    // Validation: section_name is programmatically required for saving
    if (!sectionData.section_name) {
      setError("Section Name must be provided to save the section. Please enter a unique name.");
      setLoading(false);
      return;
    }

    const payload = {
      section_type: sectionData.section_type,
      section_name: sectionData.section_name,
      category: sectionData.category || "",
      header: sectionData.header || "",
      subheader: sectionData.subheader || "",
      columns: {
        column1: {
          content: sectionData.columns?.column1?.content || "",
          links: sectionData.columns?.column1?.links || [],
          images: sectionData.columns?.column1?.images || [],
          buttons: sectionData.columns?.column1?.buttons || [],
        },
        column2: {
          content: sectionData.columns?.column2?.content || "",
          links: sectionData.columns?.column2?.links || [],
          images: sectionData.columns?.column2?.images || [],
          buttons: sectionData.columns?.column2?.buttons || [],
        },
        column3: {
          content: sectionData.columns?.column3?.content || "",
          links: sectionData.columns?.column3?.links || [],
          images: sectionData.columns?.column3?.images || [],
          buttons: sectionData.columns?.column3?.buttons || [],
        },
      },
    };

    try {
      if (isNewSection) {
        await axios.post(CREATE_SECTION_URL, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Section data added successfully!');
        onClose(); // Close modal on success
      } else {
        // This branch should ideally not be reached if isNewSection is always true
        // But keeping it for robustness if the component's usage changes
        await axios.put(UPDATE_SECTION_URL(sectionData._id), payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Section data updated successfully!');
        onClose(); // Close modal on success
      }
    } catch (err) {
      toast.error('Failed to save section data. Check console for details.');
      console.error('Error saving section:', err);
      setError('Failed to save section data.');
    } finally {
      setLoading(false);
    }
  };

  // No loading or error states for initial fetch, as it's always a new section
  // The component will always render the form

  const renderColumnFields = (columnName) => (
    <div className="border p-4 rounded-md mb-4">
      <h4 className="text-lg font-semibold mb-4 capitalize">{columnName.replace('column', 'Column ')}</h4>
      
      {/* Content */}
      <div className="mb-6">
        <label htmlFor={`${columnName}_content`} className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <div className="mt-1 relative rounded-md">
           <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
            <FileText className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <textarea
            name={`${columnName}_content`}
            id={`${columnName}_content`}
            rows="6"
            className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
            placeholder={`Enter content for ${columnName.replace('column', 'column ')}`}
            value={sectionData.columns?.[columnName]?.content || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Images URLs */}
      <div className="mb-6">
        <label htmlFor={`${columnName}_images`} className="block text-sm font-medium text-gray-700 mb-1">Images URLs (comma-separated)</label>
        <div className="mt-1 relative rounded-md">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ImageIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name={`${columnName}_images`}
            id={`${columnName}_images`}
            className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
            placeholder="url1, url2, url3"
            value={sectionData.columns?.[columnName]?.images?.join(', ') || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Buttons (Labels, comma-separated for simplicity) */}
      <div className="mb-6">
        <label htmlFor={`${columnName}_buttons`} className="block text-sm font-medium text-gray-700 mb-1">Button Labels (comma-separated)</label>
        <div className="mt-1 relative rounded-md">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MousePointerClick className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name={`${columnName}_buttons`}
            id={`${columnName}_buttons`}
            className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
            placeholder="Label 1, Label 2"
            value={sectionData.columns?.[columnName]?.buttons?.join(', ') || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Links */}
      <div className="mb-6">
        <div className="space-y-2 mb-4">
          {sectionData.columns?.[columnName]?.links?.map((link, index) => (
            <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
              <p className="text-gray-800">{link.title}: <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link.url}</a></p>
              <button
                type="button"
                onClick={() => handleRemoveLink(columnName, index)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add section</h2>
      <form onSubmit={handleSubmit}>
        {/* Section Type Field (Required) */}
        <div className="mb-6">
          <label htmlFor="section_type" className="block text-sm font-medium text-gray-700 mb-1">Section Type <span className="text-red-500">*</span></label>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Layers className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="section_type"
              id="section_type"
              className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
              placeholder="e.g., hero, about, services"
              value={sectionData.section_type || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Section Name Field (Programmatically required for saving, not UI marked) */}
        <div className="mb-6">
          <label htmlFor="section_name" className="block text-sm font-medium text-gray-700 mb-1">Section Name</label>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Edit3 className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="section_name"
              id="section_name"
              className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
              placeholder="Unique name for the section (e.g., homepage_hero)"
              value={sectionData.section_name || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Category Field (Optional) */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="category"
              id="category"
              className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
              placeholder="Optional category (e.g., general, homepage)"
              value={sectionData.category || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Header Field */}
        <div className="mb-6">
          <label htmlFor="header" className="block text-sm font-medium text-gray-700 mb-1">Display Header</label>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Heading1 className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="header"
              id="header"
              className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
              placeholder="Enter section header"
              value={sectionData.header || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Subheader Field */}
        <div className="mb-6">
          <label htmlFor="subheader" className="block text-sm font-medium text-gray-700 mb-1">Section Subheader</label>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Type className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="subheader"
              id="subheader"
              className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
              placeholder="Enter section subheader"
              value={sectionData.subheader || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Columns Section */}
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Columns</h3>
        {renderColumnFields('column1')}
        {renderColumnFields('column2')}
        {renderColumnFields('column3')}
        
        {error && <p className="text-red-500 text-sm mb-4">Error: {error}</p>}

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className={`text-white px-6 py-2 rounded-md text-lg font-semibold bg-[#4988d4] hover:bg-[#3a70b0] focus:outline-none focus:ring-2 focus:ring-[#4988d4] focus:ring-opacity-50`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SectionForm;