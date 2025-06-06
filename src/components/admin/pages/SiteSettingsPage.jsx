import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Mail, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';

const SiteSettingsPage = () => {
  const [logoFileName, setLogoFileName] = useState('');

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoFileName(file.name);
    } else {
      setLogoFileName('');
    }
  };

  return (
    <AdminLayout>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Site Navigation Settings</h2>

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
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button className="bg-[#4988d4] hover:bg-[#3a70b0] text-white px-6 py-2 rounded-md text-lg font-semibold">
            Save
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SiteSettingsPage;