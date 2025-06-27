import React from 'react';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';

const ContactPage = () => {
  return (
    <div>
      <PageHeader />
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <p className="text-gray-700">This is the contact page content.</p>
      </main>
    </div>
  );
};

export default ContactPage;