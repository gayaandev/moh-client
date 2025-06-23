import React, { useState, useEffect } from 'react';
import { GET_ALL_MENU_ITEMS_URL, GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';
import { Link } from 'react-router-dom';
import mohLogo from '../../../../assets/moh-logo.png';
import { LogIn, Phone, Mail } from 'lucide-react';

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

const SectionRenderer = ({ section }) => {
  if (!section) return null;

  // Simple renderer based on section_type
  switch (section.section_type) {
    case 'homepage': // For sections like 'Management'
      return (
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 justify-center">
            {Object.values(section.columns).map((col, index) => (
              col.content ? (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-xs mx-auto border-4 border-white">
                  {col.images[0] && <img src={col.images[0]} alt="" className="w-full h-64 object-cover" />}
                  <div className="p-6 text-center">
                    <div className="font-bold text-xl mb-2">
                      {col.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
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
        
        // Fetch page content
        const pageResponse = await fetch(GET_PAGE_BY_SLUG_PUBLI_URL('homepage_1'), {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!pageResponse.ok) throw new Error('Failed to fetch page content');
        const pageData = await pageResponse.json();
        
        setMenuTree(buildMenuTree(menuData));
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

  if (loading) return <div className="flex justify-center items-center h-20">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-20 text-red-500">Error: {error}</div>;

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
        <header className="absolute top-12 left-1/2 -translate-x-1/2 w-full lg:w-4/5 bg-white shadow-md rounded-lg z-30">
          <div className="px-6 py-3 flex justify-between items-center">
            {/* Logo and ministry name */}
            <div className="flex items-center">
              <img src={mohLogo} alt="Ministry of Health Logo" className="h-12 w-auto" />
              <div className="ml-3 text-sm font-medium text-blue-900 leading-tight">
                <div>MINISTRY OF</div>
                <div>AGRICULTURE AND IRRIGATION</div>
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
          <div className="w-full lg:w-4/5 mx-auto px-6 pt-48 pb-32 relative z-10 text-white">
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