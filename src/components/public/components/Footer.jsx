import React from 'react';
import { Link } from 'react-router-dom';

import mohLogo from './../../../assets/moh-logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white"> {/* Ignoring color, setting dark background */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* First Column (Left Box) */}
          <div className="bg-gray-800 p-8 rounded-lg"> {/* Ignoring color, setting lighter background */}
            <div className="flex items-center mb-4">
              <img src={mohLogo} alt="Ministry of Health Logo" className="h-16 w-auto" /> {/* Larger logo */}
              <div className="ml-4 text-lg font-bold text-green-500 leading-tight"> {/* Ignoring color */}

              </div>
            </div>
            <h3 className="text-lg font-semibold mb-4">Ministry Of Health Jubaland State Of Somalia</h3>
            <p className="text-gray-400 mb-6"> {/* Ignoring color */}
              The Ministry of Health in Jubaland State, Somalia, is dedicated to enhancing the well-being of its citizens.
            </p>
            <h4 className="font-semibold mt-6 mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link to="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600">
                {/* Placeholder for Facebook icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Link>
              <Link to="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600">
                {/* Placeholder for Twitter icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </Link>
              <Link to="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600">
                {/* Generic square icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
              </Link>
            </div>
          </div>

          {/* Second Column (Quick Links) */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="w-16 h-1 bg-white mb-6"></div> {/* Underline */}
            <ul className="space-y-2 text-gray-400"> {/* Ignoring color */}
              <li><Link to="#" className="hover:text-white">Home</Link></li>
              <li><Link to="/#" className="hover:text-white">About Us</Link></li>
              <li><Link to="/#" className="hover:text-white">Departments</Link></li>
              <li><Link to="/#" className="hover:text-white">Projects</Link></li>
              <li><Link to="/#" className="hover:text-white">Institutions</Link></li>
              <li><Link to="/#" className="hover:text-white">Publications</Link></li>
              <li><Link to="/#" className="hover:text-white">Events</Link></li>
              <li><Link to="/#" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Third Column (Get In Touch) */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="w-16 h-1 bg-white mb-6"></div> {/* Underline */}
            <p className="text-gray-400 space-y-2"> {/* Ignoring color */}
              Kismayo<br />
              info@jubalandstate.so<br />
              +252 (61) 0 000 000<br />
              +252 (61) 0 000 000
            </p>
          </div>

          {/* Fourth Column (Stay Updated) */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated On Health Innovations!</h3>
            <p className="text-gray-400 mb-6"> {/* Ignoring color */}
              Subscribe to receive the latest updates on our projects, programs, and policies aimed at transforming health management.
            </p>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />
            <button className="bg-[#2668C5] hover:bg-[#1F529C] text-white font-bold py-3 px-6 rounded-md w-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {/* Copyright bar as a separate section */}
      <div className="bg-gray-900 py-4 border-t border-[#192030] text-center text-gray-500">
        &copy; {new Date().getFullYear()} Ministry of Health. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;