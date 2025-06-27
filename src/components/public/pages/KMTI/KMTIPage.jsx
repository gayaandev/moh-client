import React from 'react';
import PublicLayout from '../../components/PublicLayout';
import PageHeader from '../../components/PageHeader';

const KMTIPage = () => {
  return (
    <PublicLayout>
      <PageHeader pageName="Kismayo Midwifery Training Institute (KMTI)" />
      <div className="container mx-auto p-4">
        {/* Content for KMTI Page goes here */}
        <p>Welcome to the Kismayo Midwifery Training Institute (KMTI) page.</p>
      </div>
    </PublicLayout>
  );
};

export default KMTIPage;