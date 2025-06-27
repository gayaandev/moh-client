import React from 'react';
import MainHeader from '../../components/home/MainHeader';
import AboutMinistryHomepage from '../../components/home/AboutMinistryHomepage';
import Services from '../../components/home/Services';
import OurPartnersHomepage from '../../components/home/OurPartnersHomepage';

const HomePage = () => {
  return (
    <div>
      <MainHeader />
      <AboutMinistryHomepage />
      <Services />
      <OurPartnersHomepage />
    </div>
  );
};

export default HomePage;