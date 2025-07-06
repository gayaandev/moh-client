import React from 'react';
import PageHeader from '../../../components/PageHeader';
import Footer from '../../../components/Footer';

const DamalCaafimadPage = () => {
  return (
    <div>
      <PageHeader pageName="Damal Caafimad" />
      <div className="container mx-auto p-4 w-full lg:w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-8">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">About the Damal Caafimaad Project</h2>
            <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
            <p className="text-gray-700">
              The Damal Caafimaad Project is a flagship initiative by the Federal Government of Somalia, supported by the World Bank and other global partners, aimed at strengthening the health system across Somalia. The project seeks to expand equitable access to essential health and nutrition services, particularly in underserved and vulnerable communities, while enhancing the institutional capacity of the Federal and Member State Ministries of Health.
            </p>
            <p className="text-gray-700 mt-4">
              At its core, Damal Caafimaad promotes the delivery of the Essential Package of Health Services (EPHS)—a prioritized set of life-saving and cost-effective interventions designed to meet Somalia’s most pressing health needs. Through collaboration with key stakeholders, including international donors, non-governmental organizations (NGOs), and local authorities, the project works to ensure that health services are standardized, accessible, and sustainable.
            </p>
          </div>
          <div>
            <img src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/1b4ab29c-eda3-488b-8b86-86f5c3e05dcf.webp" alt="Abdshir Yusuf" className="rounded-lg shadow-lg" />
            <div className="text-center mt-4">
              <p className="text-2xl font-bold">Abdshir Yusuf</p>
              <p className="text-xl text-gray-600">Project Manager</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-8">
          <div>
            <img src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/0f37daec-818c-45eb-8ca5-6923f2be03db.jpg" alt="Project Objectives" className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">Project Objectives</h2>
            <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
            <p className="text-gray-700 mb-4">
              The Damal Caafimaad Project aims to strengthen Somalia’s health system by achieving the following key objectives:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><strong>Expand access</strong> to essential, standardized health and nutrition services across underserved areas through the delivery of the Essential Package of Health Services (EPHS).</li>
              <li><strong>Build institutional capacity</strong> at both federal and state levels by enhancing leadership, coordination, and service delivery systems within Ministries of Health.</li>
              <li><strong>Strengthen health information systems</strong> to improve the quality, analysis, and use of data for evidence-based planning and decision-making.</li>
              <li><strong>Enhance emergency preparedness</strong> through a Contingency Emergency Response Component (CERC), enabling rapid response to health crises and natural disasters.</li>
              <li><strong>Promote accountability and inclusion</strong> by integrating environmental and social safeguards, grievance mechanisms, and gender-based violence (GBV) risk mitigation.</li>
            </ul>
          </div>
        </div>

        <div className="py-8">
          <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">Key Focus Areas</h2>
          <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Expanding Access to Health Services</h3>
              <p className="text-gray-700">The project supports the delivery of the Essential Package of Health Services (EPHS) through contracted NGOs, improving access to essential health and nutrition services in targeted regions, particularly underserved and vulnerable communities.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Building Institutional Capacity</h3>
              <p className="text-gray-700">Strengthens the leadership, governance, and planning capacities of both Federal and Member State Ministries of Health to ensure more effective and sustainable health service management.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Enhancing Project Management and Learning</h3>
              <p className="text-gray-700">Establishes Project Management Teams (PMTs) and a central Project Coordination and Implementation Unit (PCIU) to lead project execution, ensure coordination among stakeholders, and support continuous learning, monitoring, and evaluation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Emergency Preparedness and Rapid Response</h3>
              <p className="text-gray-700">Includes a Contingency Emergency Response Component (CERC) that enables quick mobilization of resources during emergencies such as disease outbreaks or natural disasters, helping to protect public health during crises.</p>
            </div>
          </div>
        </div>

        <div className="py-8">
          <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">Social Impact</h2>
          <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg">
              <img src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/240faea3-d72c-4691-a7ef-0d2dec51ce26.jpeg" alt="Improved Access to Healthcare" className="rounded-t-lg" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Improved Access to Healthcare</h3>
                <p className="text-gray-700">The project expands essential health and nutrition services to underserved and vulnerable communities, reducing health disparities and improving overall community well-being.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg">
              <img src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/937002ed-70b5-4d0b-b440-4ce11f191271.jpeg" alt="Strengthened Health Systems" className="rounded-t-lg" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Strengthened Health Systems</h3>
                <p className="text-gray-700">By building the capacity of federal and state health ministries, the project fosters more effective and sustainable health service delivery, benefiting populations long-term.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg">
              <img src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/88afaf3f-13cd-4ee6-8e10-ffc68651412a.jpeg" alt="Enhanced Gender Equality and Protection" className="rounded-t-lg" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Enhanced Gender Equality and Protection</h3>
                <p className="text-gray-700">Through targeted GBV prevention and response measures, the project promotes safer environments, empowering women and vulnerable groups and addressing gender-based violence risks.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg">
              <img src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/db1c4704-5a71-4022-85c9-19f78db12b5d.jpeg" alt="Community Empowerment and Participation" className="rounded-t-lg" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Community Empowerment and Participation</h3>
                <p className="text-gray-700">Inclusive stakeholder engagement and robust grievance mechanisms ensure communities have a voice in health service planning and delivery, fostering trust and accountability.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DamalCaafimadPage;