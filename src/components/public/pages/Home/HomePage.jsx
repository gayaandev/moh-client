import React, { useState, useEffect } from 'react';
import MainHeader from '../../components/home/MainHeader';
import { GET_ALL_MENU_ITEMS_URL, GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';
import AboutMinistryHomepage from '../../components/home/AboutMinistryHomepage';
import Services from '../../components/home/Services';
import OurPartnersHomepage from '../../components/home/OurPartnersHomepage';

const Spinner = () => (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <svg className="animate-spin h-12 w-12" style={{ color: '#4988D4' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
);

const HomePage = () => {
  const [menuTree, setMenuTree] = useState([]);
  const [pageContent, setPageContent] = useState(null); // Reverted to single pageContent
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch menu items
        const menuResponse = await fetch(GET_ALL_MENU_ITEMS_URL, {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!menuResponse.ok) throw new Error('Failed to fetch menu items');
        const menuData = await menuResponse.json();
        setMenuTree(buildMenuTree(menuData));
        
        // Fetch homepage_1 content
        const pageResponse = await fetch(GET_PAGE_BY_SLUG_PUBLI_URL('homepage_1'), {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!pageResponse.ok) throw new Error('Failed to fetch page content');
        const pageData = await pageResponse.json();
        setPageContent(pageData); // Set to single pageContent

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

    fetchData();
  }, []);

  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div>
      {loading && <Spinner />}
      <MainHeader menuTree={menuTree} pageContent={pageContent} />
      <AboutMinistryHomepage />
      <Services />
      <OurPartnersHomepage />
    </div>
  );
};

export default HomePage;