import React from 'react';
import AdminLayout from '../components/AdminLayout'; // Assuming AdminLayout is available

const BlankContentPage = () => {
  return (
    <AdminLayout>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Content Available</h2>
        <p className="text-gray-600 text-lg">This page is currently empty.</p>
      </div>
    </AdminLayout>
  );
};

export default BlankContentPage;