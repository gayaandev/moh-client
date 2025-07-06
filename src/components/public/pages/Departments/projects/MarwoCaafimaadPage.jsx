import React from 'react';
import PageHeader from '../../../components/PageHeader';
import Footer from '../../../components/Footer';

const MarwoCaafimaadPage = () => {
  return (
    <div>
      <PageHeader pageName="Marwo Caafimaad" />
      <div className="container mx-auto p-4 w-full lg:w-4/5">
        <h1>Marwo Caafimaad Page</h1>
        {/* Add page-specific content here */}
      </div>
      <Footer />
    </div>
  );
};

export default MarwoCaafimaadPage;