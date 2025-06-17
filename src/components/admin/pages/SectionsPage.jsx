import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import { BASE_URL, GET_SECTION_BY_NAME_URL, CREATE_SECTION_URL, UPDATE_SECTION_URL } from '../../../services/apis';
import { FileText, Heading1, Type, Tag, Edit3, Layers, Link as LinkIcon, Image as ImageIcon, MousePointerClick } from 'lucide-react'; // Added new icons
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

const SectionsPage = () => {
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewSection, setIsNewSection] = useState(false);

  // State for new link inputs (generic for any column)
  const [newLinkInputs, setNewLinkInputs] = useState({
    column1: { title: '', url: '' },
    column2: { title: '', url: '' },
    column3: { title: '', url: '' },
  });

  useEffect(() => {
    const initialSectionNameToLoad = sectionData?.section_name || "example_section";

    const fetchSectionData = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(GET_SECTION_BY_NAME_URL(initialSectionNameToLoad), {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data && response.data.found === false && response.data.message === 'Section not found') {
          setIsNewSection(true);
          setSectionData({
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
        } else if (response.data) {
          const data = JSON.parse(JSON.stringify(response.data)); // Deep clone

          // Normalize fetched data
          const normalizedData = {
            _id: data._id, // Keep existing ID
            section_type: data.section_type || "",
            section_name: data.section_name || initialSectionNameToLoad,
            category: data.category || "",
            header: data.header || "",
            subheader: data.subheader || "",
            columns: {
              column1: {
                content: data.columns?.column1?.content || "",
                links: Array.isArray(data.columns?.column1?.links) ? data.columns.column1.links : [],
                images: Array.isArray(data.columns?.column1?.images) ? data.columns.column1.images : [],
                buttons: Array.isArray(data.columns?.column1?.buttons) ? data.columns.column1.buttons : []
              },
              column2: {
                content: data.columns?.column2?.content || "",
                links: Array.isArray(data.columns?.column2?.links) ? data.columns.column2.links : [],
                images: Array.isArray(data.columns?.column2?.images) ? data.columns.column2.images : [],
                buttons: Array.isArray(data.columns?.column2?.buttons) ? data.columns.column2.buttons : []
              },
              column3: {
                content: data.columns?.column3?.content || "",
                links: Array.isArray(data.columns?.column3?.links) ? data.columns.column3.links : [],
                images: Array.isArray(data.columns?.column3?.images) ? data.columns.column3.images : [],
                buttons: Array.isArray(data.columns?.column3?.buttons) ? data.columns.column3.buttons : []
              },
            }
          };
          
          setSectionData(normalizedData);
          setIsNewSection(false);
        } else {
          setError('Failed to fetch section data: Invalid data structure received.');
          toast.error('Failed to fetch section data: Invalid data structure received.'); // Added toast
          setIsNewSection(true); // Treat as new if data is unusable
          setSectionData({
            section_type: "", section_name: "", category: "", header: "Error: Default Header", subheader: "Error: Default Subheader",
            columns: {
              column1: { content: "", links: [], images: [], buttons: [] },
              column2: { content: "", links: [], images: [], buttons: [] },
              column3: { content: "", links: [], images: [], buttons: [] },
            }
          });
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message === 'Section not found') {
            setIsNewSection(true);
            setSectionData({
                section_type: "", section_name: "", category: "", header: "New Section Header", subheader: "New Section Subheader",
                columns: {
                  column1: { content: "", links: [], images: [], buttons: [] },
                  column2: { content: "", links: [], images: [], buttons: [] },
                  column3: { content: "", links: [], images: [], buttons: [] },
                }
            });
        } else {
            setError('Failed to fetch section data. Check console for details.');
            toast.error('Failed to fetch section data. Check console for details.'); // Added toast
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSectionData(prev => {
      const newData = JSON.parse(JSON.stringify(prev || {
        section_type: "", section_name: "", category: "", header: "", subheader: "",
        columns: {
          column1: { content: "", links: [], images: [], buttons: [] },
          column2: { content: "", links: [], images: [], buttons: [] },
          column3: { content: "", links: [], images: [], buttons: [] },
        }
      }));

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
        // Assuming images are comma-separated URLs for simplicity
        newData.columns[colName].images = value.split(',').map(s => s.trim()).filter(s => s);
      }
      else if (name.startsWith("column") && name.endsWith("_buttons")) {
        const colName = name.split('_')[0];
        if (!newData.columns[colName]) newData.columns[colName] = { content: "", links: [], images: [], buttons: [] };
        // Assuming buttons are comma-separated JSON strings for simplicity, or just labels
        // For now, let's just store as a string, more complex UI needed for full button object
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
      category: sectionData.category || "", // Optional
      header: sectionData.header || "",
      subheader: sectionData.subheader || "",
      columns: { // Ensure full column structure is sent
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
        const postResponse = await axios.post(CREATE_SECTION_URL, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Section data added successfully!');
      } else {
        const putResponse = await axios.put(UPDATE_SECTION_URL(sectionData._id), payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Section data updated successfully!');
      }
      // Re-fetch data using the potentially updated section_name
      const response = await axios.get(GET_SECTION_BY_NAME_URL(sectionData.section_name), {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const fetchedAfterSave = JSON.parse(JSON.stringify(response.data));
       const normalizedAfterSave = {
        _id: fetchedAfterSave._id,
        section_type: fetchedAfterSave.section_type || "",
        section_name: fetchedAfterSave.section_name || "",
        category: fetchedAfterSave.category || "",
        header: fetchedAfterSave.header || "",
        subheader: fetchedAfterSave.subheader || "",
        columns: {
          column1: {
            content: fetchedAfterSave.columns?.column1?.content || "",
            links: Array.isArray(fetchedAfterSave.columns?.column1?.links) ? fetchedAfterSave.columns.column1.links : [],
            images: Array.isArray(fetchedAfterSave.columns?.column1?.images) ? fetchedAfterSave.columns.column1.images : [],
            buttons: Array.isArray(fetchedAfterSave.columns?.column1?.buttons) ? fetchedAfterSave.columns.column1.buttons : []
          },
          column2: {
            content: fetchedAfterSave.columns?.column2?.content || "",
            links: Array.isArray(fetchedAfterSave.columns?.column2?.links) ? fetchedAfterSave.columns.column2.links : [],
            images: Array.isArray(fetchedAfterSave.columns?.column2?.images) ? fetchedAfterSave.columns.column2.images : [],
            buttons: Array.isArray(fetchedAfterSave.columns?.column2?.buttons) ? fetchedAfterSave.columns.column2.buttons : []
          },
          column3: {
            content: fetchedAfterSave.columns?.column3?.content || "",
            links: Array.isArray(fetchedAfterSave.columns?.column3?.links) ? fetchedAfterSave.columns.column3.links : [],
            images: Array.isArray(fetchedAfterSave.columns?.column3?.images) ? fetchedAfterSave.columns.column3.images : [],
            buttons: Array.isArray(fetchedAfterSave.columns?.column3?.buttons) ? fetchedAfterSave.columns.column3.buttons : []
          },
        }
      };
      setSectionData(normalizedAfterSave);
      setIsNewSection(false);
    } catch (err) {
      toast.error('Failed to save section data. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !sectionData) { // Show loading only on initial load
    return (
      <AdminLayout>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md flex justify-center items-center h-64">
          <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </AdminLayout>
    );
  }

  if (error && !sectionData) { // Show error only if data couldn't be initialized
     return (
      <AdminLayout>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </AdminLayout>
    );
  }
  
  if (!sectionData) { // Fallback if still no data after loading/error checks for initial load
    return (
      <AdminLayout>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <p>Initializing section editor...</p>
        </div>
      </AdminLayout>
    );
  }

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
    <AdminLayout>
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
              className={`text-white px-6 py-2 rounded-md text-lg font-semibold ${isNewSection ? 'bg-green-500 hover:bg-green-600' : 'bg-[#4988d4] hover:bg-[#3a70b0]'}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      <Toaster /> {/* Add Toaster component here */}
    </AdminLayout>
  );
};

export default SectionsPage;