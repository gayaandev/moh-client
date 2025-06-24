import React, { useState, useEffect } from 'react';
import { GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import Lucide icons

const OurPartnersHomepage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 4; // Number of items visible at once
  const [currentIndex, setCurrentIndex] = useState(itemsPerPage); // Start with offset for seamless loop

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageResponse = await fetch(GET_PAGE_BY_SLUG_PUBLI_URL('homepage_6'), {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!pageResponse.ok) throw new Error('Failed to fetch homepage_6 content');
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

  const allPartnerImages = [];
  if (pageContent && pageContent.section_assigned_ids) {
    pageContent.section_assigned_ids.forEach(assignedSection => {
      const section = assignedSection.section;
      if (section && section.columns) {
        Object.values(section.columns).forEach(col => {
          if (col.images && col.images[0]) {
            allPartnerImages.push(col.images[0].replace(/"/g, '')); // Clean up quotes
          }
        });
      }
    });
  }

  const totalOriginalItems = allPartnerImages.length;

  // Create extended array for seamless looping
  const extendedImages = [
    ...allPartnerImages.slice(totalOriginalItems - itemsPerPage), // Last N items
    ...allPartnerImages,                                       // Original items
    ...allPartnerImages.slice(0, itemsPerPage)                 // First N items
  ];

  // Automatic slide
  useEffect(() => {
    if (totalOriginalItems === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // If we're about to go past the end of the original items (into the duplicated first items)
        if (nextIndex >= totalOriginalItems + itemsPerPage) {
          // Jump back to the start of the original items (without transition)
          setTimeout(() => {
            setCurrentIndex(itemsPerPage);
          }, 500); // Match transition duration
          return itemsPerPage; // Return the index for the jump
        }
        return nextIndex;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [totalOriginalItems]); // Depend on totalOriginalItems to re-run if images change

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= totalOriginalItems + itemsPerPage) {
        setTimeout(() => {
          setCurrentIndex(itemsPerPage);
        }, 500);
        return itemsPerPage;
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      if (nextIndex < itemsPerPage) {
        setTimeout(() => {
          setCurrentIndex(totalOriginalItems + itemsPerPage - 1); // Jump to the end of original items
        }, 500);
        return totalOriginalItems + itemsPerPage - 1;
      }
      return nextIndex;
    });
  };

  if (loading) return <div className="flex justify-center items-center h-20">Loading Our Partners...</div>;
  if (error) return <div className="flex justify-center items-center h-20 text-red-500">Error: {error}</div>;

  return (
    <section className="w-full lg:w-4/5 mx-auto px-6 py-16">
      <h2 className="text-center text-4xl font-bold text-[#6DA2D5] mb-4">
        {`Our ${pageContent?.title.replace(/[\t()]|Homepage/g, '')}`} {/* Prepend "Our" and remove tabs, parentheses, and "Homepage" from title */}
      </h2>
      <div className="w-20 h-1 bg-[#6DA2D5] mx-auto mb-12"></div>
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button onClick={handlePrev} className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none">
          <ChevronLeft size={24} />
        </button>

        <div className="overflow-hidden w-full">
          <div className="flex transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
            {extendedImages.map((imageUrl, index) => (
              <div key={index} className="flex-shrink-0 w-1/4 p-4"> {/* Each item takes 1/4 width */}
                <div className="bg-white p-4 rounded-lg border border-dashed border-[#E0F2F7] flex items-center justify-center w-40 h-40"> {/* Square card */}
                  <img src={imageUrl} alt={`Partner ${index + 1}`} className="max-w-full max-h-full object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button onClick={handleNext} className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default OurPartnersHomepage;