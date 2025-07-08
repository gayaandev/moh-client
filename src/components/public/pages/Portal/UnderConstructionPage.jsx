import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import mohLogo from '../../../../assets/moh-logo.png';

const UnderConstructionPage = () => {
  const location = useLocation();
  const systemName = location.pathname
    .replace(/-/g, ' ')
    .replace(/\//g, '')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-center p-10 bg-white rounded-lg shadow-2xl max-w-lg mx-auto">
        <img src={mohLogo} alt="Ministry of Health Logo" className="h-24 w-auto mx-auto mb-6" />
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">Under Construction</h1>
        <p className="text-lg mb-8">
          We are currently developing the <strong>{systemName}</strong>. Please check back soon!
        </p>
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default UnderConstructionPage;