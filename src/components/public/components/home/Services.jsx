import React, { useState, useEffect } from 'react';
import { GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';

const Services = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageResponse = await fetch(GET_PAGE_BY_SLUG_PUBLI_URL('homepage_3'), {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!pageResponse.ok) throw new Error('Failed to fetch homepage_3 content');
        const pageData = await pageResponse.json();
        setPageContent(pageData);
        console.log("Services API Response (homepage_3):", pageData); // Console log the response
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-20">Loading Services...</div>;
  if (error) return <div className="flex justify-center items-center h-20 text-red-500">Error: {error}</div>;

  if (!pageContent || !pageContent.section_assigned_ids) return null;

  // Combine all service columns from both sections
  const allServices = [];
  pageContent.section_assigned_ids.forEach(assignedSection => {
    const section = assignedSection.section;
    if (section && section.columns) {
      Object.values(section.columns).forEach(col => {
        if (col.content) {
          const [title, ...descriptionParts] = col.content.split('\n');
          const description = descriptionParts.join('\n').trim();
          if (title) { // Only add if there's a title
            allServices.push({ title: title.trim(), description });
          }
        }
      });
    }
  });

  return (
    <section className="w-full lg:w-4/5 mx-auto px-6 py-16">
      <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">
        {pageContent.title.replace(/[\t()]|Homepage/g, '')} {/* Remove tab characters, parentheses, and "Homepage" from title */}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allServices.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;