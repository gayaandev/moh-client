import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import mohLogo from '../../../assets/moh-logo.png';
import { LogIn, Phone, Mail } from 'lucide-react';
import { GET_ALL_MENU_ITEMS_URL, GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../services/apis';

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

const PageHeader = ({ pageName }) => {
  const [menuTree, setMenuTree] = useState([]);
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); // Get current location for active menu highlighting

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
  
  return (
    <div className="flex flex-col">
      {loading && <Spinner />}
      {/* Hero section with background image */}
      <div
        className="relative"
        style={{
          backgroundImage: mainHeaderImage ? `url(${mainHeaderImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '450px', /* Adjusted height */
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          paddingBottom: '0' /* Remove padding bottom */
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
        <div className="absolute inset-0 bg-blue-900 opacity-75 z-0"></div>
        {/* Main header */}
        <header className="absolute top-12 left-1/2 -translate-x-1/2 w-full lg:w-4/5 bg-white shadow-md rounded-lg z-30">
          <div className="px-6 py-3 flex justify-between items-center">
            {/* Logo and ministry name */}
            <div className="flex items-center">
              <img src={mohLogo} alt="Ministry of Health Logo" className="h-16 w-auto" />
              <div className="ml-3 text-sm font-medium text-blue-900 leading-tight text-left">
                <div>Ministry Of Health</div>
                <div>Jubaland Sate Of</div>
                <div>Somalia</div>

              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-1 items-center">
                {menuTree.map((item) => {
                  const itemPath = item.name.toLowerCase() === 'home' ? '/' :
                                   item.name.toLowerCase() === 'contact us' ? '/contact' :
                                   item.name.toLowerCase() === 'kismayo midwifery training institute (kmti)' ? '/kmti' :
                                   (item.children.length > 0 && item.name.toLowerCase() === 'institutions') ? '#' :
                                   `/${item.name.toLowerCase().replace(/\s/g, '-')}`;
                  const isActive = location.pathname === itemPath;

                  return (
                    <li key={item._id} className="relative group">
                      <Link
                        to={itemPath}
                        className={`px-3 py-2 rounded-md text-sm font-medium uppercase flex items-center ${
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
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </Link>
                      {item.children.length > 0 && (
                        <div className="absolute left-0 mt-1 w-max rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 text-left">
                          <ul className="py-1">
                            {item.children.map((child) => (
                              <li key={child._id}>
                                <Link to={child.name.toLowerCase().includes('kmti') ? '/kmti' : `/${generateSlug(child.name)}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
        {/* Page Title */}
        <div className="relative z-20 text-white text-center" style={{ marginTop: '100px' }}> {/* Adjusted positioning */}
          <h1 className="text-5xl font-bold">{pageName || 'Page Title'}</h1> {/* Adjusted font size */}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;