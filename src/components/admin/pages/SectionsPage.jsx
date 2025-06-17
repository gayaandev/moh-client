import React from 'react';
import AdminLayout from '../components/AdminLayout';
import SectionForm from '../components/SectionForm'; // Import the new SectionForm component
import toast from 'react-hot-toast'; // Import Toaster

const SectionsPage = () => {
  return (
    <AdminLayout>
      <SectionForm />
    </AdminLayout>
  );
};

export default SectionsPage;