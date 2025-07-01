import React from 'react';

const DutiesAndResponsibilitiesSection = ({ content }) => {
  if (!content) return null;

  const parseContent = (text) => {
    const sections = {};
    let currentSection = '';
    const lines = text.split('\n');

    lines.forEach(line => {
      if (line.startsWith('# Duties and Responsibilities of the Department')) {
        sections.mainTitle = line.replace('# ', '');
      } else if (line.startsWith('## ')) {
        currentSection = line.replace('## ', '').trim();
        sections[currentSection] = [];
      } else if (line.startsWith('- ') && currentSection) {
        sections[currentSection].push(line.replace('- ', '').trim());
      }
    });
    return sections;
  };

  const parsedSections = parseContent(content);

  const renderSection = (title, duties) => (
    <div className="mb-8 relative">
      <div className="absolute -left-[50px] top-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center border-4 border-white">
        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
        {duties.map((duty, index) => (
          <li key={index}>{duty}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="mt-12 mb-12">
      {parsedSections.mainTitle && (
        <>
          <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">{parsedSections.mainTitle}</h2>
          <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
        </>
      )}
      
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Left Column */}
        <div className="lg:w-1/2 relative border-l-2 border-gray-200 pl-8 mb-8 lg:mb-0">
          {parsedSections.Director && renderSection("Director", parsedSections.Director)}
          {parsedSections.Admin && renderSection("Admin", parsedSections.Admin)}
        </div>
        
        {/* Right Column */}
        <div className="lg:w-1/2 relative border-l-2 border-gray-200 pl-8">
          {parsedSections.Finance && renderSection("Finance", parsedSections.Finance)}
          {parsedSections.HR && renderSection("HR", parsedSections.HR)}
          {parsedSections.IT && renderSection("IT", parsedSections.IT)}
        </div>
      </div>
    </div>
  );
};

export default DutiesAndResponsibilitiesSection;