import React from 'react';

const RecentEvents = () => {
  const eventItems = [
    { 
      id: 1, 
      title: 'Health Awareness Campaign', 
      date: '2025-06-15', 
      body: 'A comprehensive health awareness campaign focusing on preventable diseases will be conducted across major districts.',
      borderColor: 'border-green-500'
    },
    { 
      id: 2, 
      title: 'Medical Supply Distribution', 
      date: '2025-06-10', 
      body: 'Essential medical supplies will be distributed to rural health centers to improve service delivery in remote areas.',
      borderColor: 'border-[#4988d4]'
    },
    { 
      id: 3, 
      title: 'Community Health Workshop', 
      date: '2025-05-30', 
      body: 'Healthcare professionals will conduct workshops on basic health practices for community health workers.',
      borderColor: 'border-red-500'
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Events</h2>
      <ul className="space-y-4">
        {eventItems.map(event => (
          <li 
            key={event.id} 
            className={`pl-4 py-2 border-l-4 ${event.borderColor} bg-white rounded shadow-sm`}
          >
            <p className="text-sm text-gray-500 mb-1">Event Date: {event.date}</p>
            <h3 className="text-md font-medium text-gray-800 mb-1">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentEvents;