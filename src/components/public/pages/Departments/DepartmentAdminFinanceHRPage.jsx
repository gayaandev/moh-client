import React from 'react';
import PublicLayout from '../../components/PublicLayout';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
const DepartmentAdminFinanceHRPage = () => {
  return (
    <PublicLayout>
      <PageHeader pageName="Department Admin Finance and HR" />
      <div className="container mx-auto p-4 w-full lg:w-4/5 py-8">
        <div className="flex flex-col lg:flex-row items-start lg:space-x-8">
          {/* Left Column: Background of the Department */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold mb-4">Background Of The Department</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Administration and Finance Department at the Ministry of Health Jubaland state of Somalia serves as a critical division overseeing administrative, financial, and budgetary functions. With a primary focus on supporting the health sector, our department plays a pivotal role in ensuring efficient resource utilization, fostering financial transparency, and facilitating seamless ministry operations. Our department's overarching goal is to bolster the operational capacity of the Ministry of Health, particularly in areas such as procurement, finance, administration, and IT. Under the direct supervision of the Director General, we oversee the administration, finance, logistics, and archive service sections. Key functions of our department include providing administrative support, forecasting and managing balance sheets, budget management, financial reporting and risk assessment, and establishing standards for financial performance. The department is dedicated to upholding the highest standards of professionalism and efficiency in our endeavors to contribute to the growth and sustainability of the Ministry of Health's mission.
            </p>
          </div>

          {/* Right Column: Director's Information */}
          <div className="lg:w-1/2 flex flex-col items-center text-center">
            <img
              src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/783c97dd-56b3-46fc-9218-09efe4faa5a6.jpeg"
              alt="Director Image"
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
            <h3 className="text-2xl font-semibold italic mb-1">Mohamed Abdikadir</h3>
            <p className="text-xl italic mb-2">Director Of Admin and Finance</p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="flex flex-col lg:flex-row items-center lg:space-x-8 mt-8">
          {/* Left Column: Image */}
          <div className="lg:w-2/5 mb-8 lg:mb-0">
            <img
              src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/a35d6c42-4521-43f2-8c5e-312bc8370c6a.jpeg"
              alt="Our Vision"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          {/* Right Column: Vision Text */}
          <div className="lg:w-3/5 flex flex-col space-y-4">
            <div className="p-4 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Vision</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be the leading department in administrative and financial excellence, fostering a robust and transparent framework that empowers the Ministry of Health to achieve its mandate of providing accessible, high-quality healthcare services for all citizens.
              </p>
            </div>
            <div className="p-4 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                To strategically manage financial and administrative resources, ensuring transparency, accountability, and efficient operations to support the Ministry of Health's objectives in improving public health outcomes and sustainable healthcare development.
              </p>
            </div>
          </div>
        </div>
  
  
        <div className="container mx-auto p-4 w-full lg:w-4/5 py-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Structure Department</h2>
          <div className="flex justify-center">
            <img
              src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/8e6931da-1b49-4eb0-a57c-e799f317a5c0.webp"
              alt="Organizational Chart"
              className="w-full h-auto rounded-lg"
            />
          </div>
        
        </div>

      </div>
      <Footer />
    </PublicLayout>
  );
};

export default DepartmentAdminFinanceHRPage