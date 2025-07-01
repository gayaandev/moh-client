import React, { useState, useEffect } from 'react';
import PublicLayout from '../../components/PublicLayout';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import { GET_PAGE_BY_SLUG_PUBLI_URL } from '../../../../services/apis';

const DepartmentAdminFinanceHRPage = () => {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(GET_PAGE_BY_SLUG_PUBLI_URL('department_admin_finance_hr'), {
          headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch department page content');
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

  if (loading) {
    return (
      <PublicLayout>
        <PageHeader pageName="Department Admin Finance and HR" />
        <div className="container mx-auto p-4 w-full lg:w-4/5 text-center">Loading department content...</div>
        <Footer />
      </PublicLayout>
    );
  }

  if (error) {
    return (
      <PublicLayout>
        <PageHeader pageName="Department Admin Finance and HR" />
        <div className="container mx-auto p-4 w-full lg:w-4/5 text-center text-red-500">Error: {error}</div>
        <Footer />
      </PublicLayout>
    );
  }

  const departmentSection1 = pageContent?.section_assigned_ids?.find(
    (section) => section.section?.section_type === 'Department Admin Finance and HR'
  )?.section;

  const departmentSection2 = pageContent?.section_assigned_ids?.find(
    (section) => section.section?.section_type === 'Department Admin Finance and HR2'
  )?.section;

  return (
    <PublicLayout>
      <PageHeader pageName="Department Admin Finance and HR" />
      <div className="container mx-auto p-4 w-full lg:w-4/5">
        {departmentSection1 && (
          <>
            {/* Section 1: Background and Director */}
            <div className="flex flex-col lg:flex-row items-start lg:space-x-8 py-8">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                {departmentSection1.columns?.column1?.content && (() => {
                  const lines = departmentSection1.columns.column1.content.split('\n');
                  const title = lines[0].replace(/#\s*(.*?)\s*$/, '$1');
                  const contentBody = lines.slice(1).join('\n').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').trim();
                  return (
                    <>
                      {title && (
                        <>
                          <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">{title}</h2>
                          <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
                        </>
                      )}
                      <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: contentBody }} />
                    </>
                  );
                })()}
              </div>
              <div className="lg:w-1/2 flex flex-col items-center text-center">
                {departmentSection1.columns?.column1?.images?.[0] && (
                  <img
                    src={departmentSection1.columns.column1.images[0]}
                    alt="Director Image"
                    className="w-full h-auto rounded-lg shadow-md mb-4"
                  />
                )}
                <h3 className="text-2xl font-semibold italic mb-1">Mohamed Abdikadir</h3>
                <p className="text-xl italic mb-2">Director Of Admin and Finance</p>
              </div>
            </div>

            {/* Section 2: Vision and Mission */}
            <div className="flex flex-col lg:flex-row items-center lg:space-x-8 mt-8">
              <div className="lg:w-2/5 mb-8 lg:mb-0">
                {departmentSection1.columns?.column2?.images?.[0] && (
                  <img
                    src={departmentSection1.columns.column2.images[0]}
                    alt="Our Vision"
                    className="w-full h-auto rounded-lg"
                  />
                )}
              </div>
              <div className="lg:w-3/5 flex flex-col space-y-4">
                {departmentSection1.columns?.column2?.content && (() => {
                  const content = departmentSection1.columns.column2.content;
                  const visionMatch = content.match(/\*\*Vision\*\*\s*([\s\S]*?)(?=\*\*Mission\*\*|$)/);
                  const missionMatch = content.match(/\*\*Mission\*\*\s*([\s\S]*)/);

                  return (
                    <>
                      {visionMatch && visionMatch[1] && (
                        <div className="p-4 rounded-lg">
                          <h3 className="text-2xl font-bold mb-2">Vision</h3>
                          <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: visionMatch[1].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').trim() }} />
                        </div>
                      )}
                      {missionMatch && missionMatch[1] && (
                        <div className="p-4 rounded-lg">
                          <h3 className="text-2xl font-bold mb-2">Mission</h3>
                          <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: missionMatch[1].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').trim() }} />
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Section 3: Duties and Responsibilities */}
            <div className="mt-12 mb-12">
              {departmentSection1.columns?.column3?.content && (() => {
                const parsedSections = parseContent(departmentSection1.columns.column3.content);
                return (
                  <>
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
                  </>
                );
              })()}
            </div>
          </>
        )}

        {departmentSection2 && (
          <>
            {/* Section 4: Structure Department */}
            <div className="container mx-auto p-4 w-full lg:w-4/5 py-8 text-center">
              {departmentSection2.columns?.column1?.content && (() => {
                const lines = departmentSection2.columns.column1.content.split('\n');
                const title = lines[0].replace(/#\s*(.*?)\s*$/, '$1');
                return (
                  <>
                    {title && (
                      <>
                        <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">{title}</h2>
                        <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
                      </>
                    )}
                    <div className="flex justify-center">
                      {departmentSection2.columns?.column1?.images?.[0] && (
                        <img
                          src={departmentSection2.columns.column1.images[0]}
                          alt="Organizational Chart"
                          className="w-full h-auto rounded-lg"
                        />
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </>
        )}

        {!departmentSection1 && !departmentSection2 && !loading && !error && (
          <div className="text-center py-8">No department content available.</div>
        )}
      </div>
      <Footer />
    </PublicLayout>
  );
};

export default DepartmentAdminFinanceHRPage