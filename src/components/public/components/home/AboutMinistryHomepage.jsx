import React, { useState, useEffect } from 'react';
import { GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';

const AboutMinistryHomepage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageResponse = await fetch(GET_PAGE_BY_SLUG_PUBLI_URL('homepage_2'), {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!pageResponse.ok) throw new Error('Failed to fetch homepage_2 content');
        const pageData = await pageResponse.json();
        setPageContent(pageData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-20">Loading About Ministry...</div>;
  if (error) return <div className="flex justify-center items-center h-20 text-red-500">Error: {error}</div>;

  const aboutMinistrySection = pageContent?.section_assigned_ids
    ?.find(section => section.section?.section_type === 'about-ministry-hompage')?.section;

  const ministerWordSection = pageContent?.section_assigned_ids
    ?.find(section => section.section?.section_type === 'minister-word-hompage')?.section;

  if (!aboutMinistrySection && !ministerWordSection) return null; // Don't render if no relevant sections found

  const column1Content = aboutMinistrySection?.columns?.column1?.content?.split('\n').filter(line => line.trim() !== '') || [];
  const column2Image = aboutMinistrySection?.columns?.column2?.images?.[0];
  const column2Content = aboutMinistrySection?.columns?.column2?.content;

  return (
    <>
      {/* About Ministry Section */}
      {aboutMinistrySection && (
        <section className="w-full lg:w-4/5 mx-auto px-6 py-16 mt-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h2 className="text-[#6DA2D5] text-3xl font-bold mb-2">About Ministry</h2>
              <div className="w-20 h-1 bg-[#6DA2D5] mb-8"></div> {/* Blue underline */}
              <h3 className="text-[#58677E] text-4xl font-bold leading-tight mb-6">
                {aboutMinistrySection.header}
              </h3>
              {column1Content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 text-lg mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Right Column */}
            <div>
              {column2Image && (
                <img
                  src={column2Image}
                  alt="Ministry Building"
                  className="w-full h-auto rounded-lg shadow-md mb-6"
                />
              )}
              {column2Content && (
                <p className="text-gray-600 italic text-lg border-l-4 border-gray-300 pl-4">
                  {column2Content}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Minister Word Section */}
      {ministerWordSection && (
        <section className="w-full lg:w-4/5 mx-auto px-6 py-16 bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image and Italic Text */}
            <div>
              {ministerWordSection.columns?.column1?.images?.[0] && (
                <img
                  src={ministerWordSection.columns.column1.images[0]}
                  alt="Minister"
                  className="w-full h-auto rounded-lg shadow-md mb-6"
                />
              )}
              {ministerWordSection.columns?.column1?.content?.split('\n').filter(line => line.trim() !== '').map((paragraph, index) => (
                <p key={index} className="text-gray-600 italic text-lg border-l-4 border-gray-300 pl-4 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Right Column - Title, Underline, and Main Content */}
            <div>
              <h2 className="uppercase text-[#6DA2D5] text-lg font-semibold mb-2">
                {ministerWordSection.section_name}
              </h2>
              <div className="w-20 h-1 bg-[#6DA2D5] mb-8"></div> {/* Green underline */}
              {ministerWordSection.columns?.column2?.content?.split('\n').filter(line => line.trim() !== '').map((paragraph, index) => (
                <p key={index} className="text-gray-700 text-lg mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AboutMinistryHomepage;