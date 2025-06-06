import React from 'react';
import { Link } from 'react-router-dom';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center">
                  <span className="bg-blue w-8 h-8 rounded-md flex items-center justify-center mr-2">
                    <span className="text-white font-bold">M</span>
                  </span>
                  <span className="text-xl font-bold text-gray-800">Ministry of Health</span>
                </Link>
              </div>
            </div>
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue px-3 py-2 font-medium">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue px-3 py-2 font-medium">
                About
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-blue px-3 py-2 font-medium">
                Services
              </Link>
              <Link to="/news" className="text-gray-700 hover:text-blue px-3 py-2 font-medium">
                News
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue px-3 py-2 font-medium">
                Contact
              </Link>
              <Link to="/admin" className="bg-secondary text-white px-3 py-2 rounded-md font-medium" style={{ backgroundColor: '#4988d4' }}>
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ministry of Health</h3>
              <p className="text-gray-300">
                Providing quality healthcare services to the people of Jubaland State of Somalia.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link to="/services" className="text-gray-300 hover:text-white">Services</Link></li>
                <li><Link to="/news" className="text-gray-300 hover:text-white">News</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">
                123 Health Street, Kismayo, Somalia<br />
                Email: info@moh.gov.so<br />
                Phone: +252 61 234 5678
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
            &copy; {new Date().getFullYear()} Ministry of Health. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;