import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import MenuItemForm from '../components/MenuItemForm'; // Component for adding new menu items
import MenuItemFormUpdate from '../components/MenuItemFormUpdate'; // Component for updating existing menu items
import axios from 'axios'; // Import axios
import { GET_ALL_MENU_ITEMS_URL, DELETE_MENU_ITEM_URL } from '../../../services/apis'; // Import API URLs
import toast from 'react-hot-toast'; // Import toast
import ConfirmationDialog from '../components/ConfirmationDialog'; // Import ConfirmationDialog
import { X, ChevronRight, Menu, Settings } from 'lucide-react'; // Import icons from lucide-react

const AllMenuItemsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [menuItemToDeleteId, setMenuItemToDeleteId] = useState(null);
  const [menuItemToEditId, setMenuItemToEditId] = useState(null); // New state for editing
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  // Helper function to build a hierarchical menu structure
  const buildMenuTree = (items, parentId = null) => {
    return items
      .filter(item => item.parent === parentId)
      .sort((a, b) => a.order - b.order) // Sort by order for siblings
      .map(item => ({
        ...item,
        children: buildMenuTree(items, item._id)
      }));
  };

  const handleOpenModal = (id = null, e) => { // Accept optional ID and event
    if (e) e.stopPropagation(); // Prevent triggering parent click events
    setMenuItemToEditId(id); // Set the ID of the menu item to edit
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Re-fetch menu items after closing modal
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.get(GET_ALL_MENU_ITEMS_URL, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const sortedAndTreeItems = buildMenuTree(response.data);
          setMenuItems(sortedAndTreeItems);
        })
        .catch(err => console.error('Error re-fetching menu items:', err));
    }
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    setMenuItemToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmDialogOpen(false);
    const id = menuItemToDeleteId;
    setMenuItemToDeleteId(null); // Clear the ID

    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token not found. Please log in.');
      return;
    }

    try {
      await axios.delete(DELETE_MENU_ITEM_URL(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Menu item deleted successfully!');
      setMenuItems(prevMenuItems => prevMenuItems.filter(item => item._id !== id));
    } catch (err) {
      toast.error('Failed to delete menu item. Please try again.');
      console.error('Error deleting menu item:', err);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDialogOpen(false);
    setMenuItemToDeleteId(null);
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(GET_ALL_MENU_ITEMS_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched menu items:', response.data); // Log fetched data
        const sortedAndTreeItems = buildMenuTree(response.data);
        
        // Initialize all parent items as expanded
        const initialExpandedState = {};
        response.data.forEach(item => {
          if (item.children && item.children.length > 0) {
            initialExpandedState[item._id] = true;
          }
        });
        setExpandedItems(initialExpandedState);
        
        setMenuItems(sortedAndTreeItems);
      } catch (err) {
        setError('Failed to fetch menu items. Please try again.');
        console.error('Error fetching menu items:', err);
        console.error('Full error object:', err); // Log full error object
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Recursive component to render menu items in WordPress style
  const MenuItemDisplay = ({ item, level = 0 }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item._id];
    
    return (
      <div className="menu-item-container">
        <div
          onClick={() => hasChildren && toggleExpand(item._id)}
          className={`flex items-center justify-between w-full py-2 px-4 ${level === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-50 cursor-pointer border-b border-gray-200 ${hasChildren ? 'font-medium' : ''}`}
          style={{ paddingLeft: `${level * 16 + 16}px` }}
        >
          <div className="flex items-center">
            {hasChildren && (
              <ChevronRight 
                size={16} 
                className={`mr-2 transition-transform duration-200 ${isExpanded ? 'transform rotate-90' : ''}`} 
              />
            )}
            {!hasChildren && level > 0 && <div className="w-4 h-4 mr-2"></div>}
            <span className={`${level === 0 ? 'text-gray-700' : 'text-gray-600'}`}>
              {item.name}
            </span>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={(e) => handleOpenModal(item._id, e)}
              className="text-gray-500 hover:text-blue-500 mr-2"
            >
              <Settings size={16} />
            </button>
            <button
              onClick={(e) => handleDeleteClick(item._id, e)}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        {hasChildren && (
          <div className="children-container">
            {item.children.map(child => (
              <MenuItemDisplay key={child._id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminLayout
      modal={
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={menuItemToEditId ? "Edit Menu Item" : "Add New Menu Item"}>
          {menuItemToEditId ? (
            <MenuItemFormUpdate menuItemId={menuItemToEditId} onClose={handleCloseModal} />
          ) : (
            <MenuItemForm onClose={handleCloseModal} />
          )}
        </Modal>
      }
    >
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Menu className="mr-2 text-gray-700" />
            <h2 className="text-2xl font-semibold text-gray-800">Menu Structure</h2>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add New Menu Item
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
          <div className="border border-gray-200 rounded-md overflow-hidden"> {/* WordPress-style menu container */}
            {menuItems.length > 0 ? (
              menuItems.map(item => (
                <MenuItemDisplay key={item._id} item={item} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No menu items found.
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        message="Are you sure you want to delete this menu item?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </AdminLayout>
  );
};

export default AllMenuItemsPage;