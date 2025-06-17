import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Mail, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';
import axios from 'axios';
import { BASE_URL, GET_SECTION_BY_NAME_URL, CREATE_SECTION_URL, UPDATE_SECTION_URL } from '../../../services/apis';

const SiteSettingsPage = () => {
  const [logoFileName, setLogoFileName] = useState('');
  const [siteInfo, setSiteInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewSiteInfo, setIsNewSiteInfo] = useState(false);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoFileName(file.name);
    } else {
      setLogoFileName('');
    }
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

    const payload = {
      section_type: "siteinfo",
      section_name: "siteinfo",
      header: "Site Information",
      subheader: "Contact and Social Media Details",
      columns: {
        column1: {
          // Set content to an empty string as per backend expectation
          content: "",
          links: siteInfo?.columns?.column1?.links || [],
          // Note: email and phone data from siteInfo.columns.column1.content.email/phone
          // are not being sent in this 'content' field anymore.
          // If they need to be saved, a different part of the payload or a different endpoint might be needed.
        },
      },
    };

    try {
      console.log("handleSubmit - isNewSiteInfo:", isNewSiteInfo);
      console.log("handleSubmit - payload:", JSON.stringify(payload, null, 2));
      if (isNewSiteInfo) {
        console.log("handleSubmit - Attempting to POST to:", CREATE_SECTION_URL);
        const postResponse = await axios.post(CREATE_SECTION_URL, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("handleSubmit - POST response:", postResponse);
        alert('Site information added successfully!');
      } else {
        console.log("handleSubmit - Attempting to PUT to:", UPDATE_SECTION_URL(siteInfo._id));
        const putResponse = await axios.put(UPDATE_SECTION_URL(siteInfo._id), payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("handleSubmit - PUT response:", putResponse);
        alert('Site information updated successfully!');
      }
      // Re-fetch data to ensure UI is up-to-date
      console.log("handleSubmit - Attempting to GET from:", GET_SECTION_BY_NAME_URL('siteinfo'));
      const response = await axios.get(GET_SECTION_BY_NAME_URL('siteinfo'), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("handleSubmit - GET response after save:", response);
      setSiteInfo(response.data);
      setIsNewSiteInfo(false);
    } catch (err) {
      setError('Failed to save site information. Check console for details.');
      console.error('Error saving site info:', err.response ? err.response.data : err.message, err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchSiteInfo = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        console.log("fetchSiteInfo - Attempting to GET from:", GET_SECTION_BY_NAME_URL('siteinfo'));
        const response = await axios.get(GET_SECTION_BY_NAME_URL('siteinfo'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("fetchSiteInfo - Raw response from GET:", response);
        console.log("fetchSiteInfo - Raw response.data from GET:", JSON.stringify(response.data, null, 2));

        // Check if the backend indicates "not found"
        if (response.data && response.data.found === false && response.data.message === 'Section not found') {
          console.log("fetchSiteInfo - Section not found, setting isNewSiteInfo to true and initializing siteInfo.");
          setIsNewSiteInfo(true);
          setSiteInfo({
            section_type: "siteinfo",
            section_name: "siteinfo",
            header: "Site Information",
            subheader: "Contact and Social Media Details",
            columns: {
              column1: { content: { email: '', phone: '' }, links: [], images: [], buttons: [] },
              column2: { content: '', links: [], images: [], buttons: [] }, // Ensure full structure
              column3: { content: '', links: [], images: [], buttons: [] }  // Ensure full structure
            },
          });
        } else if (response.data) { // Data IS found
          console.log("fetchSiteInfo - Data found, processing...");
          const data = JSON.parse(JSON.stringify(response.data)); // Deep clone to avoid modifying original response object
          console.log("fetchSiteInfo - Fetched data (cloned):", JSON.stringify(data, null, 2));

          // Ensure columns and column1 exist
          if (!data.columns) data.columns = {};
          if (!data.columns.column1) {
            data.columns.column1 = { content: "", links: [], images: [], buttons: [] }; // Default if column1 is missing
          }
          
          // Ensure content in column1 is an object for the form, even if backend stores it as string
          if (typeof data.columns.column1.content !== 'object') {
            console.log("fetchSiteInfo - Converting column1.content from string to object for form state.");
            // If content was a string (e.g., ""), initialize email/phone.
            // If it was a string with actual content, that content is not directly mapped to email/phone here.
            data.columns.column1.content = { email: '', phone: '' };
          } else if (data.columns.column1.content === null || data.columns.column1.content === undefined) {
            // Handle cases where content might be explicitly null or undefined
             data.columns.column1.content = { email: '', phone: '' };
          }


          // Ensure links, images, buttons arrays exist in column1
          if (!Array.isArray(data.columns.column1.links)) data.columns.column1.links = [];
          if (!Array.isArray(data.columns.column1.images)) data.columns.column1.images = [];
          if (!Array.isArray(data.columns.column1.buttons)) data.columns.column1.buttons = [];

          // Ensure column2 and column3 exist with basic structure
          if (!data.columns.column2) data.columns.column2 = { content: '', links: [], images: [], buttons: [] };
          if (!data.columns.column3) data.columns.column3 = { content: '', links: [], images: [], buttons: [] };
          
          console.log("fetchSiteInfo - Data after normalization:", JSON.stringify(data, null, 2));
          setSiteInfo(data);
          setIsNewSiteInfo(false);
        } else {
          // Handle cases where response.data might be null or undefined unexpectedly
          console.error("fetchSiteInfo - response.data is null or undefined, but not the 'not found' case.");
          setError('Failed to fetch site information: Invalid data structure received.');
           setSiteInfo({ // Fallback to a new structure
            section_type: "siteinfo", section_name: "siteinfo", header: "Site Information", subheader: "Contact and Social Media Details",
            columns: { column1: { content: { email: '', phone: '' }, links: [], images: [], buttons: [] },
                       column2: { content: '', links: [], images: [], buttons: [] },
                       column3: { content: '', links: [], images: [], buttons: [] }}
          });
          setIsNewSiteInfo(true); // Treat as new if data is unusable
        }
      } catch (err) {
        console.error("fetchSiteInfo - Error during fetch or processing:", err);
        // Check if the error is the specific "not found" message from the backend, even if it's an error status
        if (err.response && err.response.data && err.response.data.message === 'Section not found') {
            console.log("fetchSiteInfo - Caught error, but it's a 'Section not found' (e.g. 404), setting isNewSiteInfo to true");
            setIsNewSiteInfo(true);
            setSiteInfo({
                section_type: "siteinfo", section_name: "siteinfo", header: "Site Information", subheader: "Contact and Social Media Details",
                columns: { column1: { content: { email: '', phone: '' }, links: [], images: [], buttons: [] },
                           column2: { content: '', links: [], images: [], buttons: [] },
                           column3: { content: '', links: [], images: [], buttons: [] }}
            });
        } else {
            setError('Failed to fetch site information. Check console for details.');
            console.error('Detailed error fetching site info:', err.response ? err.response.data : err.message, err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSiteInfo();
  }, []);

  console.log('SiteSettingsPage - Loading:', loading, 'Error:', error, 'SiteInfo:', siteInfo);

  if (loading) {
    return (
      <AdminLayout>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <p>Loading site settings...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Site Settings</h2>
        <form onSubmit={handleSubmit}>

        {/* Logo Section */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3 text-gray-700">Logo</h3>
          <div className="flex items-center space-x-4">
            <img src="/src/assets/moh-logo.png" alt="Current Logo" className="h-16 w-16 object-contain border border-gray-300 rounded-md p-1" />
            <div className="flex flex-col">
              <label htmlFor="logo-upload" className="text-gray-800 px-4 py-2 rounded-md cursor-pointer text-center border border-gray-300 hover:bg-gray-100">
                Upload
              </label>
              <input
                type="file"
                id="logo-upload"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <span className="text-sm text-gray-500 mt-2">{logoFileName || 'No file chosen'}</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3 text-gray-700">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="mt-1 relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-gray-300 block w-1/2 pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
                  placeholder="your.email@example.com"
                  value={siteInfo?.columns?.column1?.content?.email || ''}
                  onChange={(e) => {
                    setSiteInfo(prev => {
                      const newSiteInfo = JSON.parse(JSON.stringify(prev || {})); // Deep clone or initialize
                      if (!newSiteInfo.columns) newSiteInfo.columns = {};
                      if (!newSiteInfo.columns.column1) newSiteInfo.columns.column1 = {};
                      if (!newSiteInfo.columns.column1.content) newSiteInfo.columns.column1.content = {};
                      newSiteInfo.columns.column1.content.email = e.target.value;
                      return newSiteInfo;
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="mt-1 relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="border border-gray-300 block w-1/2 pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
                  placeholder="+252 611234569"
                  value={siteInfo?.columns?.column1?.content?.phone || ''}
                  onChange={(e) => {
                    setSiteInfo(prev => {
                      const newSiteInfo = JSON.parse(JSON.stringify(prev || {})); // Deep clone or initialize
                      if (!newSiteInfo.columns) newSiteInfo.columns = {};
                      if (!newSiteInfo.columns.column1) newSiteInfo.columns.column1 = {};
                      if (!newSiteInfo.columns.column1.content) newSiteInfo.columns.column1.content = {};
                      newSiteInfo.columns.column1.content.phone = e.target.value;
                      return newSiteInfo;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-medium mb-3 text-gray-700">Social Media Links</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <div className="mt-1 relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Facebook className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="url"
                  name="facebook"
                  id="facebook"
                  className="border border-gray-300 block w-1/2 pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
                  placeholder="https://facebook.com/yourpage"
                  value={siteInfo?.columns?.column1?.links?.find(link => link.title === 'Facebook')?.url || ''}
                  onChange={(e) => {
                    setSiteInfo(prev => {
                      const newSiteInfo = JSON.parse(JSON.stringify(prev || {})); // Deep clone or initialize
                      if (!newSiteInfo.columns) newSiteInfo.columns = {};
                      if (!newSiteInfo.columns.column1) newSiteInfo.columns.column1 = {};
                      if (!newSiteInfo.columns.column1.links) newSiteInfo.columns.column1.links = [];

                      const newLinks = newSiteInfo.columns.column1.links;
                      const facebookLinkIndex = newLinks.findIndex(link => link.title === 'Facebook');
                      if (facebookLinkIndex > -1) {
                        newLinks[facebookLinkIndex].url = e.target.value;
                      } else {
                        newLinks.push({ title: 'Facebook', url: e.target.value });
                      }
                      return newSiteInfo;
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">X (Twitter) URL</label>
              <div className="mt-1 relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Twitter className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="url"
                  name="twitter"
                  id="twitter"
                  className="border border-gray-300 block w-1/2 pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
                  placeholder="https://x.com/yourhandle"
                  value={siteInfo?.columns?.column1?.links?.find(link => link.title === 'Twitter')?.url || ''}
                  onChange={(e) => {
                    setSiteInfo(prev => {
                      const newSiteInfo = JSON.parse(JSON.stringify(prev || {})); // Deep clone or initialize
                      if (!newSiteInfo.columns) newSiteInfo.columns = {};
                      if (!newSiteInfo.columns.column1) newSiteInfo.columns.column1 = {};
                      if (!newSiteInfo.columns.column1.links) newSiteInfo.columns.column1.links = [];

                      const newLinks = newSiteInfo.columns.column1.links;
                      const twitterLinkIndex = newLinks.findIndex(link => link.title === 'Twitter');
                      if (twitterLinkIndex > -1) {
                        newLinks[twitterLinkIndex].url = e.target.value;
                      } else {
                        newLinks.push({ title: 'Twitter', url: e.target.value });
                      }
                      return newSiteInfo;
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <div className="mt-1 relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  className="border border-gray-300 block w-1/2 pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={siteInfo?.columns?.column1?.links?.find(link => link.title === 'LinkedIn')?.url || ''}
                  onChange={(e) => {
                    setSiteInfo(prev => {
                      const newSiteInfo = JSON.parse(JSON.stringify(prev || {})); // Deep clone or initialize
                      if (!newSiteInfo.columns) newSiteInfo.columns = {};
                      if (!newSiteInfo.columns.column1) newSiteInfo.columns.column1 = {};
                      if (!newSiteInfo.columns.column1.links) newSiteInfo.columns.column1.links = [];

                      const newLinks = newSiteInfo.columns.column1.links;
                      const linkedinLinkIndex = newLinks.findIndex(link => link.title === 'LinkedIn');
                      if (linkedinLinkIndex > -1) {
                        newLinks[linkedinLinkIndex].url = e.target.value;
                      } else {
                        newLinks.push({ title: 'LinkedIn', url: e.target.value });
                      }
                      return newSiteInfo;
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          {isNewSiteInfo ? (
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-lg font-semibold">
              Add Site Info
            </button>
          ) : (
            <button type="submit" className="bg-[#4988d4] hover:bg-[#3a70b0] text-white px-6 py-2 rounded-md text-lg font-semibold">
              Save Changes
            </button>
          )}
        </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SiteSettingsPage;