import React from 'react';
import { Link } from 'react-router-dom';

const PublicLayout = ({ children }) => {
  return (
    <div className="bg-white text-gray-800">
      {/* Main Content */}
      <main className="flex-grow">
        <div className="py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ministry of Health</h3>
              <p className="text-gray-600">
                Providing quality healthcare services to the people of Jubaland State of Somalia.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                <li><Link to="/services" className="text-gray-600 hover:text-gray-900">Services</Link></li>
                <li><Link to="/news" className="text-gray-600 hover:text-gray-900">News</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-600">
                123 Health Street, Kismayo, Somalia<br />
                Email: info@moh.gov.so<br />
                Phone: +252 61 234 5678
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6 text-center text-gray-500">
            &copy; {new Date().getFullYear()} Ministry of Health. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;