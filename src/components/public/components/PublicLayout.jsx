import React from 'react';
import Footer from './Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;