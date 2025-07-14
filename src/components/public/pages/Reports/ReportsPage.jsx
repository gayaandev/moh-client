import React from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import { Download } from 'lucide-react'; // Import Download icon

const ReportsPage = () => {
  // Dummy data for PDF reports
  const pdfReports = [
    { id: 1, name: 'Jubaland Operational Plan 2025-2026', url: 'https://moh-assets.nyc3.cdn.digitaloceanspaces.com/Jubaland%20Operational%20Plan%202025-2026.pdf', size: '3.5 MB', publishedDate: '01/01/2025' },
  ];

  const pdfIconUrl = 'https://moh-assets.nyc3.cdn.digitaloceanspaces.com/850b8006-4150-4f7f-9ce7-ac8922646923.png';

  return (
    <div>
      <PageHeader pageName="Reports" />
      <div className="w-full lg:w-4/5 mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfReports.map((report) => (
            <a
              key={report.id}
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              download={report.name + '.pdf'} // Add download attribute
              className="relative flex items-center p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white group"
            >
              <img src={pdfIconUrl} alt="PDF Icon" className="w-12 h-12 mr-4 flex-shrink-0" />
              <div className="flex-grow">
                <span className="text-lg font-medium text-gray-700 block">{report.name}</span>
                <span className="text-sm text-gray-500">Size: {report.size} | Published: {report.publishedDate}</span>
              </div>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Download className="w-6 h-6 text-blue-500" />
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportsPage;