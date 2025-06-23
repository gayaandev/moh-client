import React, { useState, useEffect } from 'react';
import { GET_ALL_MENU_ITEMS_URL } from '../../../../services/apis';
import { Link } from 'react-router-dom';
import mohLogo from '../../../../assets/moh-logo.png';

const MainHeader = () => {
  const [menuTree, setMenuTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(GET_ALL_MENU_ITEMS_URL, {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const menuData = await response.json();
        setMenuTree(buildMenuTree(menuData));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const buildMenuTree = (items) => {
      const itemMap = {};
      const roots = [];
      items.forEach(item => {
        itemMap[item._id] = { ...item, children: [] };
      });
      items.forEach(item => {
        if (item.parent && itemMap[item.parent]) {
          itemMap[item.parent].children.push(itemMap[item._id]);
        } else {
          roots.push(itemMap[item._id]);
        }
      });
      const sortByOrder = (a, b) => a.order - b.order;
      roots.sort(sortByOrder);
      roots.forEach(root => root.children.sort(sortByOrder));
      return roots;
    };

    fetchMenuItems();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-20">Loading Menu...</div>;
  if (error) return <div className="flex justify-center items-center h-20 text-red-500">Error: {error}</div>;

  return (
    <div className="w-full bg-transparent relative z-50">
      {/* Language selector */}
      <div className="flex justify-end px-4 py-1 bg-transparent">
        <div className="flex items-center text-sm">
          <img
            src="https://flagcdn.com/w20/gb.png"
            alt="English"
            className="w-5 h-auto mr-1"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent border-none text-sm focus:outline-none cursor-pointer"
          >
            <option value="English">English</option>
            <option value="Somali">Somali</option>
          </select>
        </div>
      </div>
      
      {/* Main header */}
      <header className="bg-white shadow-md rounded-3xl mx-4 mb-4">
        <div className="px-6 py-3 flex justify-between items-center">
          {/* Logo and ministry name */}
          <div className="flex items-center">
            <img src={mohLogo} alt="Ministry of Health Logo" className="h-12 w-auto" />
            <div className="ml-3 text-sm font-medium text-green-800 leading-tight">
              <div>MINISTRY OF</div>
              <div>HEALTH</div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1 items-center">
              {menuTree.map((item) => (
                <li key={item._id} className="relative group">
                  <Link
                    to={item.path}
                    className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium uppercase flex items-center"
                  >
                    {item.name}
                    {item.children.length > 0 && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  {item.children.length > 0 && (
                    <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                      <ul className="py-1">
                        {item.children.map((child) => (
                          <li key={child._id}>
                            <Link to={child.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          {/* ERP Button */}
          <div>
            <Link
              to="/login"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              ERP MOH
            </Link>
          </div>
          
          {/* Mobile menu button - hidden on desktop */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-green-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;