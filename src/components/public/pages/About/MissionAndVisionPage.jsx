import React from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

const MissionAndVisionPage = () => {
  return (
    <div>
      <PageHeader pageName="Mission, Vision & Core Values" />
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image Section */}
          <div className="flex items-start bg-white p-12 rounded-lg shadow-lg h-full">
            <img src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/5ec8d99b-4bd7-4786-b74d-1c7d36d05692.png" alt="Mission and Vision" className="rounded-lg w-full h-full object-cover" />
          </div>

          {/* Text Content Section */}
          <div className="flex flex-col justify-center">
            {/* Vision & Mission Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-orange-500 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                Build the highest standard of health and wellbeing of all people of Jubaland state through a strong and professional health system, responsive to the health needs of the population.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To promote the health and welfare of Somalis in Jubaland through providing and regulating a comprehensive package of promotive, preventive, curative, and rehabilitative health services of the highest possible quality in an equitable manner.
              </p>
            </div>

            {/* Core Values Section */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-green-500 mb-4">Our Core Values</h2>
              <p className="text-gray-700 leading-relaxed">
                The following signifies the core values that the Ministry embodies through our staff: Professionalism, Honesty and integrity, Commitment, Community Focus, Innovation and Creativity, Equity, and Respect for human dignity.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MissionAndVisionPage;