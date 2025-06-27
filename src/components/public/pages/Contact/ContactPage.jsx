import React from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import { Phone, Mail } from 'lucide-react';

const ContactPage = () => {
  return (
    <div>
      <PageHeader pageName="Contact Us" />
      <main className="container mx-auto px-6 py-12 w-full lg:w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border-none ring-1 ring-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#4988D4]"
                   placeholder="Your Name"
                 />
               </div>
               <div>
                 <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                 <input
                   type="email"
                   id="email"
                   className="shadow appearance-none border-none ring-1 ring-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#4988D4]"
                   placeholder="Your Email"
                 />
               </div>
               <div>
                 <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">Subject</label>
                 <input
                   type="text"
                   id="subject"
                   className="shadow appearance-none border-none ring-1 ring-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#4988D4]"
                   placeholder="Subject"
                 />
               </div>
               <div>
                 <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                 <textarea
                   id="message"
                   rows="5"
                   className="shadow appearance-none border-none ring-1 ring-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#4988D4]"
                   placeholder="Your Message"
                 ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#4988D4] hover:bg-[#3a70b0] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Embedded Map */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Location</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7979.492400086134!2d42.551301!3d-0.344501!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1802d3a4c2cc8ed5%3A0xcd42bb77f4c3004a!2sWasaaradda%20Caafimaadka%20Jubaland!5e0!3m2!1sen!2sso!4v1751013564065!5m2!1sen!2sso"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-6 text-gray-700">
              <p className="flex items-center mb-2">
                <Phone className="w-5 h-5 mr-2 text-[#4988D4]" />
                +252 61 000 0000
              </p>
              <p className="flex items-center mb-2">
                <Mail className="w-5 h-5 mr-2 text-[#4988D4]" />
                info@mohjubalandstate.so
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-[#4988D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Kismayo, Jubaland, Somalia
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default ContactPage;