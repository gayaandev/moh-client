import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import mohLogo from '../../../../assets/moh-logo.png';
import { LogIn, Phone, Mail } from 'lucide-react';
import SectionRenderer from '../SectionRenderer';
import { GET_ALL_MENU_ITEMS_URL, GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';

// Lucide icon components
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Map social media URLs to their respective icons
const getSocialIcon = (url) => {
  if (url.includes('facebook')) return <FacebookIcon />;
  if (url.includes('twitter')) return <TwitterIcon />;
  if (url.includes('instagram')) return <InstagramIcon />;
  return null;
};

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

const generateSlug = (name) => {
  return name.toLowerCase()
             .replace(/[^a-z0-9]/g, ' ') // Replace non-alphanumeric characters with space
             .trim() // Trim leading/trailing spaces
             .replace(/\s+/g, '-') // Replace spaces with single hyphens
             .replace(/-+/g, '-'); // Collapse multiple hyphens
};

const MainHeader = () => {
  const [menuTree, setMenuTree] = useState([]);
  const [pageContent, setPageContent] = useState(null);
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
        setPageContent(pageData);

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

  // Find the siteinfo section if it exists
  const siteInfoSection = pageContent?.section_assigned_ids
    ?.find(section => section.section?.section_type === 'siteinfo')?.section;
    
  // Find the main-header section if it exists
  const mainHeaderSection = pageContent?.section_assigned_ids
    ?.find(section => section.section?.section_type === 'main-header')?.section;
  
  // Get the background image from the main-header section
  const mainHeaderImage = mainHeaderSection?.columns?.column1?.images?.[0];
  
  // Get the content from the main-header section
  const headerContent = mainHeaderSection?.columns?.column1?.content?.split('\n') || [];

  // Get management section
  const managementSection = pageContent?.section_assigned_ids
    ?.find(section => section.section?.section_type === 'homepage')?.section;

  return (
    <div className="min-h-screen flex flex-col">
      {loading && <Spinner />}
      {/* Hero section with background image */}
      <div
        className="relative pb-32"
        style={{
          backgroundImage: mainHeaderImage ? `url(${mainHeaderImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '700px'
        }}
      >
        {/* Site info section (top bar) */}
        {siteInfoSection && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full lg:w-4/5 z-40 text-white text-xs">
            <div className="container mx-auto px-6 py-2 flex justify-between items-center">
              <div className="flex space-x-2 items-center">
                {siteInfoSection.columns.column1.content.split('\n').map((line, index, array) => (
                  <React.Fragment key={index}>
                    <span className="flex items-center">
                      {line.includes('@') ? <Mail className="w-4 h-4 mr-1" /> : <Phone className="w-4 h-4 mr-1" />}
                      {line}
                    </span>
                    {index < array.length - 1 && <span className="opacity-50">|</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex space-x-4 items-center">
                <div className="flex space-x-3">
                  <a href="#" className="hover:text-white"><FacebookIcon /></a>
                  <a href="#" className="hover:text-white"><TwitterIcon /></a>
                  <a href="#" className="hover:text-white"><InstagramIcon /></a>
                </div>
                <a
                  href="https://www.mohjubalandstate.so/admin/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-white hover:text-gray-200"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  <span>Login</span>
                </a>
              </div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-blue-900 opacity-50 z-0"></div>
        {/* Main header */}
        <header className="absolute top-4 md:top-12 left-1/2 -translate-x-1/2 w-full lg:w-4/5 bg-white shadow-md rounded-lg z-30">
          <div className="px-6 py-3 flex justify-between items-center">
            {/* Logo and ministry name */}
            <div className="flex items-center">
              <img src={mohLogo} alt="Ministry of Health Logo" className="h-16 w-auto" />
              <div className="ml-3 text-sm font-medium text-blue-900 leading-tight">
                <div>Ministry Of Health</div>
                <div>Jubaland Sate Of</div>
                <div>Somalia</div>

              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-1 items-center text-xs md:text-sm"> {/* Adjusted font size for responsiveness */}
                {menuTree.map((item) => {
                  const itemPath = item.name.toLowerCase() === 'home' ? '/' :
                                   item.name.toLowerCase() === 'contact us' ? '/contact' :
                                   item.name.toLowerCase().includes('kmti') ? '/kmti' :
                                   item.name.toLowerCase() === 'about us' ? '/about' : // Added specific path for About Us
                                   (item.children.length > 0 && item.name.toLowerCase() === 'institutions') ? '#' :
                                   `/${generateSlug(item.name)}`;
                  const isActive = location.pathname === itemPath;

                  return (
                    <li key={item._id} className="relative group">
                      {item.name.toLowerCase() === 'about us' ? (
                        <span
                          className={`px-2 py-1 md:px-3 md:py-2 rounded-md font-medium uppercase flex items-center ${
                            item.name.toUpperCase() === 'CONTACT US'
                              ? 'bg-[#4988D4] hover:bg-[#3a70b0] text-white'
                              : ''
                          } ${
                            isActive
                              ? 'text-[#4988d4]'
                              : 'text-gray-700 hover:text-[#4988d4]'
                          }`}
                        >
                          {item.name}
                          {item.children.length > 0 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </span>
                      ) : (
                        <Link
                          to={itemPath}
                          className={`px-2 py-1 md:px-3 md:py-2 rounded-md font-medium uppercase flex items-center ${
                            item.name.toUpperCase() === 'CONTACT US'
                              ? 'bg-[#4988D4] hover:bg-[#3a70b0] text-white'
                              : ''
                          } ${
                            isActive
                              ? 'text-[#4988d4]'
                              : 'text-gray-700 hover:text-[#4988d4]'
                          }`}
                        >
                          {item.name}
                          {item.children.length > 0 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </Link>
                      )}
                      {item.children.length > 0 && (
                        <div className="absolute left-0 mt-1 w-max rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 text-left">
                          <ul className="py-1">
                            {item.children.map((child) => (
                              <li key={child._id}>
                                <Link to={child.name.toLowerCase().includes('kmti') ? '/kmti' : `/${generateSlug(child.name)}`} className="block px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100">
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
            
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

        {/* Hero content */}
        {mainHeaderSection && (
          <div className="w-full lg:w-4/5 mx-auto px-6 pt-24 md:pt-48 pb-32 relative z-10 text-white">
            <div className="max-w-3xl">
              {headerContent.map((line, index) => (
                <h1 key={index} className={`${index === 0 ? 'text-5xl text-white' : 'text-6xl'} font-bold ${index > 0 ? 'mt-2' : 'mb-4'}`}>
                  {line}
                </h1>
              ))}
              
              <div className="mt-8 flex flex-wrap gap-4">
                {mainHeaderSection.columns.column2.content && (
                  <a href="#learn-more" className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium">
                    {mainHeaderSection.columns.column2.content}
                  </a>
                )}
                <a href="#reports" className="border border-white text-white hover:bg-white hover:text-green-800 px-6 py-3 rounded-lg font-medium transition-colors">
                  See Our Reports
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Management section */}
        {managementSection && (
          <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-full lg:w-4/5 z-20">
            <SectionRenderer section={managementSection} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;