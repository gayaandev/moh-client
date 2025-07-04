import React from 'react';

const SectionRenderer = ({ section }) => {
  if (!section) return null;

  // Simple renderer based on section_type
  switch (section.section_type) {
    case 'homepage': // For sections like 'Management'
      return (
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 justify-center items-start"> {/* Align items to start for vertical offset */}
            {Object.values(section.columns).map((col, index) => {
              let marginTopClass = '';
              if (index === 1) { // Deputy Minister (second card)
                marginTopClass = 'md:mt-8'; // Slightly lower
              } else if (index === 2) { // Director General (third card)
                marginTopClass = 'md:mt-16'; // Even lower
              }
              return col.content ? (
                <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden max-w-xs mx-auto border-4 border-white ${marginTopClass}`}>
                  {col.images[0] && <img src={col.images[0]} alt="" className="w-full h-64 object-cover" />}
                  <div className="p-6 text-center">
                    <div className="mb-2">
                      {col.content.split('\n').map((line, i) => (
                        <p key={i} className={i === 0 ? 'font-bold text-xl text-gray-800' : 'uppercase font-semibold text-base'}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default SectionRenderer;