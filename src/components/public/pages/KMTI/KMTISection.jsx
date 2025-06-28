import React from 'react';

const KMTISection = ({ section }) => {
  if (!section || !section.columns) {
    return null;
  }

  const { column1, column2, column3 } = section.columns;

  return (
    <div className="container mx-auto px-6 py-12 w-full lg:w-4/5">
      {column1 && column1.images && column1.images.length > 0 && (
        <div className="mb-12">
          <img src={column1.images[0]} alt="KMTI Main Image" className="w-full h-[500px] object-cover rounded-lg" />
        </div>
      )}

      {column2 && (
        <div className="bg-white p-8 rounded-lg flex flex-col md:flex-row-reverse items-center mb-12">
          {column2.images && column2.images.length > 0 && (
            <img src={column2.images[0]} alt="KMTI Image 2" className="w-full md:w-1/2 h-96 object-cover rounded-md mb-4 md:mb-0 md:ml-6" />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About KMTI</h2>
            <p className="text-gray-700">{column2.content}</p>
          </div>
        </div>
      )}
      {column3 && (
        <div className="bg-white p-8 rounded-lg flex flex-col md:flex-row items-center">
          {column3.images && column3.images.length > 0 && (
            <img src={column3.images[0]} alt="KMTI Image 3" className="w-full md:w-1/2 h-96 object-cover rounded-md mb-4 md:mb-0 md:mr-6" />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ministry's Role</h2>
            <p className="text-gray-700">{column3.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KMTISection;