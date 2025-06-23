import React, { useState, useEffect } from 'react';
import MainHeader from '../../components/home/MainHeader';
import { GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';

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

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

// Map social media URLs to their respective icons
const getSocialIcon = (url) => {
  if (url.includes('facebook')) return <FacebookIcon />;
  if (url.includes('twitter')) return <TwitterIcon />;
  if (url.includes('instagram')) return <InstagramIcon />;
  if (url.includes('youtube')) return <YoutubeIcon />;
  return null;
};

const SectionRenderer = ({ section }) => {
  if (!section) return null;

  // Simple renderer based on section_type
  switch (section.section_type) {
    case 'siteinfo':
      return (
        <div className="bg-gray-100 text-gray-600 text-xs">
          <div className="container mx-auto px-6 py-1 flex justify-between items-center">
            <div className="flex space-x-4">
              {section.columns.column1.content.split('\n').map((line, index) => (
                <span key={index}>{line}</span>
              ))}
            </div>
            <div className="flex space-x-3">
              {section.columns.column1.links.map(link => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 flex items-center"
                  title={link.title}
                >
                  {getSocialIcon(link.url) || link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    case 'main-header':
       const mainHeaderImage = section.columns?.column1?.images?.[0];
       return (
         <div
           className="shadow-md relative py-16 text-white"
           style={{
             backgroundImage: mainHeaderImage ? `url(${mainHeaderImage})` : 'none',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
           }}
         >
           <div className="absolute inset-0 bg-black opacity-50"></div>
           <div className="container mx-auto px-6 relative z-10">
              <h1 className="text-4xl font-bold">{section.header}</h1>
              <p className="text-lg mt-2">{section.subheader}</p>
           </div>
         </div>
       );
    case 'homepage': // For sections like 'Management'
      return (
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">{section.section_name}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {Object.values(section.columns).map((col, index) => (
              col.content ? (
                <div key={index}>
                  {col.images[0] && <img src={col.images[0]} alt="" className="w-32 h-32 rounded-full mx-auto mb-4" />}
                  <div className="font-semibold">
                    {col.content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
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


const HomePage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(GET_PAGE_BY_SLUG_PUBLI_URL('homepage_1'), {
          headers: {
            'X-API-Key': import.meta.env.VITE_X_API_KEY,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch page content');
        const data = await response.json();
        setPageContent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, []);

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
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Site info section (top bar) */}
      {siteInfoSection && (
        <div className="bg-gray-100 text-gray-600 text-xs">
          <div className="container mx-auto px-6 py-1 flex justify-between items-center">
            <div className="flex space-x-4">
              {siteInfoSection.columns.column1.content.split('\n').map((line, index) => (
                <span key={index}>{line}</span>
              ))}
            </div>
            <div className="flex space-x-3">
              {siteInfoSection.columns.column1.links.map(link => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 flex items-center"
                  title={link.title}
                >
                  {getSocialIcon(link.url) || link.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Hero section with background image */}
      <div
        className="relative"
        style={{
          backgroundImage: mainHeaderImage ? `url(${mainHeaderImage})` : 'linear-gradient(rgba(0,100,0,0.7), rgba(0,100,0,0.3))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Header */}
        <MainHeader />
        
        {/* Hero content */}
        {mainHeaderSection && (
          <div className="container mx-auto px-6 pt-20 pb-24 relative z-10 text-white">
            <div className="max-w-3xl">
              {headerContent.map((line, index) => (
                <h1 key={index} className={`${index === 0 ? 'text-5xl' : 'text-4xl'} font-bold ${index > 0 ? 'mt-2' : 'mb-4'}`}>
                  {line}
                </h1>
              ))}
              
              <div className="mt-8 flex flex-wrap gap-4">
                {mainHeaderSection.columns.column2.content && (
                  <a href="#learn-more" className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-md font-medium">
                    {mainHeaderSection.columns.column2.content}
                  </a>
                )}
                <a href="#reports" className="border border-white text-white hover:bg-white hover:text-green-800 px-6 py-3 rounded-md font-medium transition-colors">
                  See Our Reports
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Main content */}
      <main>
        {loading && <p className="text-center py-12">Loading Page...</p>}
        {error && <p className="text-center py-12 text-red-500">Error: {error}</p>}
        {pageContent && pageContent.section_assigned_ids
          .filter(section =>
            section.section?.section_type !== 'main-header' &&
            section.section?.section_type !== 'siteinfo'
          ) // Skip sections we've already rendered
          .sort((a, b) => a.order - b.order)
          .map(assignedSection => (
            <SectionRenderer key={assignedSection._id} section={assignedSection.section} />
          ))
        }
      </main>
    </div>
  );
};

export default HomePage;