import React from 'react';
import MainHeader from '../../components/home/MainHeader';
import AboutMinistryHomepage from '../../components/home/AboutMinistryHomepage';
import Services from '../../components/home/Services';
import OurPartnersHomepage from '../../components/home/OurPartnersHomepage';
import Footer from '../../components/Footer';

const HomePage = () => {
  return (
    <div>
      <MainHeader />
      <AboutMinistryHomepage />
      <Services />
      <OurPartnersHomepage />
      <Footer/>
    </div>
  );
};

export default HomePage;