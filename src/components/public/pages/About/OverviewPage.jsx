import React, { useState, useEffect } from 'react';
import PublicLayout from '../../components/PublicLayout';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import { GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';

const OverviewPage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(GET_PAGE_BY_SLUG_PUBLI_URL('overview'), {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch overview page content');
        }
        const data = await response.json();
        setPageContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, []);

  const renderContent = (content) => {
    if (!content) return null;
    const lines = content.split('\n');
    const title = lines[0].replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold markdown for title
    const paragraphs = lines.slice(1).join('\n').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold text for paragraphs

    return (
      <>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {paragraphs.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: paragraph.trim() }} />
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <PublicLayout>
        <PageHeader pageName="Overview" />
        <div className="container mx-auto p-4 w-full lg:w-4/5 text-center">Loading overview content...</div>
        <Footer />
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <PageHeader pageName="Overview" />
        <div className="container mx-auto p-4 w-full lg:w-4/5 text-center text-red-500">Error: {error}</div>
        <Footer />
      </PublicLayout>
    );
  }

  const overviewSection = pageContent?.section_assigned_ids?.find(
    (section) => section.section?.section_type === 'overview'
  )?.section;

  return (
    <PublicLayout>
      <PageHeader pageName="Overview" />
      <div className="container mx-auto p-4 w-full lg:w-4/5">
        {overviewSection && (
          <>
            {/* Section 1 */}
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/2 mb-6 md:mb-0">
                {overviewSection.columns?.column1?.images?.[0] && (
                  <img src={overviewSection.columns.column1.images[0]} alt="Ministry Image 1" className="w-full h-auto rounded-lg" />
                )}
              </div>
              <div className="md:w-1/2 md:pl-12">
                {renderContent(overviewSection.columns?.column1?.content)}
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center mb-12">
              <div className="md:w-1/2 mb-6 md:mb-0">
                {overviewSection.columns?.column2?.images?.[0] && (
                  <img src={overviewSection.columns.column2.images[0]} alt="Ministry Image 2" className="w-full h-auto rounded-lg" />
                )}
              </div>
              <div className="md:w-1/2 md:pr-12">
                {renderContent(overviewSection.columns?.column2?.content)}
              </div>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/2 mb-6 md:mb-0">
                {overviewSection.columns?.column3?.images?.[0] && (
                  <img src={overviewSection.columns.column3.images[0]} alt="Ministry Image 3" className="w-full h-auto rounded-lg" />
                )}
              </div>
              <div className="md:w-1/2 md:pl-12">
                {renderContent(overviewSection.columns?.column3?.content)}
              </div>
            </div>
          </>
        )}
        {!overviewSection && !loading && !error && (
          <div className="text-center py-8">No overview content available.</div>
        )}
      </div>
      <Footer />
    </PublicLayout>
  );
};

export default OverviewPage;