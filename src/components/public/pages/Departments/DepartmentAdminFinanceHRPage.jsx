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
            <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">Background Of The Department</h2>
            <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
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
              src="https://moh-assets.nyc3.cdn.digitaloceanspaces.com/506e3710-d918-495e-8c08-281e84a46137.webp"
              alt="Our Vision"
              className="w-full h-auto rounded-lg"
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
  
{/* Duties and Responsibilities Section */}
<div className="mt-12 mb-12">
  <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">Duties and Responsibilities of the Department</h2>
  <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
  
  <div className="flex flex-col lg:flex-row lg:space-x-8">
    {/* Left Column */}
    <div className="lg:w-1/2 relative border-l-2 border-gray-200 pl-8 mb-8 lg:mb-0">
      {/* Director Duties */}
      <div className="mb-8 relative">
        <div className="absolute -left-[50px] top-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center border-4 border-white">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Director</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
          <li>Oversee departmental operations and strategy</li>
          <li>Provide leadership and direction to teams</li>
          <li>Set and monitor departmental goals and KPIs</li>
          <li>Approve budgets and financial plans</li>
          <li>Liaise with external partners and stakeholders</li>
          <li>Ensure compliance with laws and regulations</li>
          <li>Evaluate departmental performance</li>
          <li>Make high-level policy decisions</li>
          <li>Resolve interdepartmental issues</li>
          <li>Represent the department in board or public meetings</li>
        </ul>
      </div>
      
      {/* Admin Duties */}
      <div className="relative">
        <div className="absolute -left-[50px] top-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center border-4 border-white">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Admin</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
          <li>Coordinate daily administrative operations</li>
          <li>Maintain accurate office records and files</li>
          <li>Handle scheduling and calendar management</li>
          <li>Oversee procurement of office supplies and services</li>
          <li>Supervise support staff and clerical workers</li>
          <li>Ensure compliance with administrative policies</li>
          <li>Manage facility-related logistics</li>
          <li>Handle correspondence and communication</li>
          <li>Organize meetings and take minutes</li>
          <li>Support event planning and internal logistics</li>
        </ul>
      </div>
    </div>
    
    {/* Right Column */}
    <div className="lg:w-1/2 relative border-l-2 border-gray-200 pl-8">
      {/* Finance Duties */}
      <div className="mb-8 relative">
        <div className="absolute -left-[50px] top-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center border-4 border-white">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Finance</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
          <li>Prepare and monitor departmental budgets</li>
          <li>Process payroll and maintain financial records</li>
          <li>Track and report expenditures and revenues</li>
          <li>Conduct internal financial audits</li>
          <li>Ensure compliance with tax and accounting standards</li>
          <li>Oversee invoice processing and payment schedules</li>
          <li>Manage financial risk and cash flow</li>
          <li>Provide financial reports to management</li>
          <li>Support grant and donor fund management</li>
          <li>Liaise with auditors and financial institutions</li>
        </ul>
      </div>
      
      {/* Additional section if needed */}
      <div className="relative">
        <div className="absolute -left-[50px] top-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center border-4 border-white">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
        <h3 className="text-2xl font-bold mb-2">HR</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
          <li>Recruit, hire, and onboard new staff</li>
          <li>Manage employee performance reviews</li>
          <li>Develop and enforce HR policies</li>
          <li>Facilitate staff training and development</li>
          <li>Address employee relations and grievances</li>
          <li>Maintain personnel records and contracts</li>
          <li>Oversee compensation and benefits administration</li>
          <li>Ensure workplace health and safety compliance</li>
          <li>Foster a positive organizational culture</li>
          <li>Support succession planning and talent development</li>
        </ul>
      </div>
      
      {/* IT Section */}
      <div className="relative mt-8">
        <div className="absolute -left-[50px] top-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center border-4 border-white">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
        <h3 className="text-2xl font-bold mb-2">IT</h3>
        <ul className="list-disc pl-5 text-lg text-gray-700 leading-relaxed">
          <li>Maintain and troubleshoot hardware and software</li>
          <li>Ensure cybersecurity and data protection</li>
          <li>Oversee network infrastructure and connectivity</li>
          <li>Provide technical support to staff</li>
          <li>Manage user access and system permissions</li>
          <li>Install and update software systems</li>
          <li>Maintain IT asset inventory</li>
          <li>Conduct regular system backups</li>
          <li>Implement new technology solutions</li>
          <li>Monitor system performance and uptime</li>
        </ul>
      </div>
    </div>
  </div>
</div>
  
        <div className="container mx-auto p-4 w-full lg:w-4/5 py-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-center text-[#6DA2D5]">Structure Department</h2>
          <div className="w-24 h-1 bg-[#6DA2D5] mx-auto mb-6"></div>
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