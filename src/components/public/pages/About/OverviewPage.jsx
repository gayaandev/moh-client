import React from 'react';
import PublicLayout from '../../components/PublicLayout';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

const OverviewPage = () => {
  return (
    <PublicLayout>
      <PageHeader pageName="Overview" />
      <div className="container mx-auto p-4 w-full lg:w-4/5">
        <h1 className="text-3xl font-bold mb-4">Ministry Overview</h1>
        <p className="text-lg">
          This section provides a comprehensive overview of the Ministry of Health,
          including its mission, vision, values, and strategic objectives.
          We are committed to improving the health and well-being of all citizens
          through effective policies, programs, and services.
        </p>
        {/* Add more content here */}
      </div>
      <Footer />
    </PublicLayout>
  );
};

export default OverviewPage;