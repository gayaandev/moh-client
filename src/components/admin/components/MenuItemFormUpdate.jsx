import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Edit3, Link as LinkIcon, ListOrdered, Layers, X } from 'lucide-react'; // Import relevant icons
import { GET_SINGLE_MENU_ITEM_URL, UPDATE_MENU_ITEM_URL, GET_ALL_MENU_ITEMS_URL } from '../../../services/apis';

const MenuItemFormUpdate = ({ menuItemId, onClose }) => {
  const [menuItemData, setMenuItemData] = useState({
    name: "",
    path: "",
    order: 0,
    parent: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parentOptions, setParentOptions] = useState([]);

  // Fetch menu item data and parent options
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      // Fetch menu item details
      try {
        const response = await axios.get(GET_SINGLE_MENU_ITEM_URL(menuItemId), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setMenuItemData({
          name: data.name || "",
          path: data.path || "",
          order: data.order || 0,
          parent: data.parent || null,
        });
      } catch (err) {
        setError('Failed to fetch menu item details. Check console for details.');
        console.error('Error fetching menu item details:', err);
        toast.error('Failed to fetch menu item details.');
      }

      // Fetch parent options
      try {
        const parentResponse = await axios.get(GET_ALL_MENU_ITEMS_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setParentOptions(parentResponse.data);
      } catch (err) {
        console.error('Error fetching parent menu items:', err);
        toast.error('Failed to fetch parent menu items.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [menuItemId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuItemData(prev => ({
      ...prev,
      [name]: name === "order" && value !== "" ? parseInt(value, 10) :
              name === "parent" && value === "" ? null : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!menuItemData.name) {
      setError("Menu Item Name is required.");
      setLoading(false);
      return;
    }
    if (!menuItemData.path) {
      setError("Menu Item Path is required.");
      setLoading(false);
      return;
    }

    const token = sessionStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please log in.');
      setLoading(false);
      return;
    }

    const payload = {
      name: menuItemData.name,
      path: menuItemData.path,
      order: menuItemData.order,
      parent: menuItemData.parent,
    };

    try {
      await axios.put(UPDATE_MENU_ITEM_URL(menuItemId), payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Menu item updated successfully!');
      onClose(); // Close modal on success
    } catch (err) {
      toast.error('Failed to update menu item. Check console for details.');
      console.error('Error updating menu item:', err);
      setError('Failed to update menu item.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg">
      <Toaster />
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Update Menu Item</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field (Required) */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Edit3 className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
              placeholder="e.g., Home, About Us"
              value={menuItemData.name || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Path Field (Required) */}
        <div className="mb-6">
          <label htmlFor="path" className="block text-sm font-medium text-gray-700 mb-1">Path <span className="text-red-500">*</span></label>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="path"
              id="path"
              className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
              placeholder="e.g., /, /about-us"
              value={menuItemData.path || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Parent Field (Optional) */}
        <div className="mb-6">
          <label htmlFor="parent" className="block text-sm font-medium text-gray-700 mb-1">Parent Menu Item</label>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Layers className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <select
              name="parent"
              id="parent"
              className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
              value={menuItemData.parent || ''}
              onChange={handleInputChange}
            >
              <option value="">None (Top Level)</option>
              {parentOptions.map(item => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Order Field (Optional) */}
        <div className="mb-6">
          <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ListOrdered className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="number"
              name="order"
              id="order"
              className="border border-gray-300 block w-full pl-10 sm:text-sm rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-[#5e96d6]"
              placeholder="e.g., 1, 2, 3"
              value={menuItemData.order === 0 ? '' : menuItemData.order} // Display empty string for 0
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        {error && <p className="text-red-500 text-sm mb-4">Error: {error}</p>}

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className={`text-white px-6 py-2 rounded-md text-lg font-semibold bg-[#4988d4] hover:bg-[#3a70b0] focus:outline-none focus:ring-2 focus:ring-[#4988d4] focus:ring-opacity-50`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuItemFormUpdate;