import React from 'react';

const DashboardCard = ({ title, value, percentage, icon: Icon, bgColor }) => {
  return (
    <div 
      className="p-4 rounded-lg shadow-md text-white transition-all duration-300" 
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        {Icon && <Icon size={40} className="text-white opacity-80" />}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      {percentage && (
        <div className="text-sm">
          <span className="text-green-300">↑ {percentage}</span> from last month
        </div>
      )}
    </div>
  );
};

export default DashboardCard;