import React from 'react';
import PublicLayout from '../../components/PublicLayout';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

const DepartmentAdminFinanceHRPage = () => {
  return (
    <PublicLayout>
      <PageHeader pageName="Department Admin Finance and HR" />
      <div className="container mx-auto p-4 w-full lg:w-4/5 text-center py-8">
        {/* Content for Department Admin Finance and HR page will go here */}
        <p>This is the Department Admin Finance and HR page.</p>
      </div>
      <Footer />
    </PublicLayout>
  );
};

export default DepartmentAdminFinanceHRPage;