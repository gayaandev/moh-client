import React from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import { Download } from 'lucide-react'; // Import Download icon

const PolicyPage = () => {
  // Dummy data for PDF policies
  const pdfPolicies = [
    { id: 1, name: 'Ministry of Health Jubaland - HR Policies and Procedures V1', url: 'https://moh-assets.nyc3.cdn.digitaloceanspaces.com/Ministry%20of%20Health%20Jubaland%20-%20HR%20Policies%20and%20Procedures%20V1.pdf', size: '4.5 MB', publishedDate: '2024-06-20' },
  ];

  const pdfIconUrl = 'https://moh-assets.nyc3.cdn.digitaloceanspaces.com/850b8006-4150-4f7f-9ce7-ac8922646923.png';

  return (
    <div>
      <PageHeader pageName="Policies" />
      <div className="w-full lg:w-4/5 mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfPolicies.map((policy) => (
            <a
              key={policy.id}
              href={policy.url}
              target="_blank"
              rel="noopener noreferrer"
              download={policy.name + '.pdf'} // Add download attribute
              className="relative flex items-center p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white group"
            >
              <img src={pdfIconUrl} alt="PDF Icon" className="w-12 h-12 mr-4 flex-shrink-0" />
              <div className="flex-grow">
                <span className="text-lg font-medium text-gray-700 block">{policy.name}</span>
                <span className="text-sm text-gray-500">Size: {policy.size} | Published: {policy.publishedDate}</span>
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

export default PolicyPage;