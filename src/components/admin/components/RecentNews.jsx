import React from 'react';

const RecentNews = () => {
  const newsItems = [
    { 
      id: 1, 
      title: 'New Health Policy Implemented', 
      date: '2025-06-01', 
      body: 'The Ministry of Health has implemented a new comprehensive health policy aimed at improving healthcare access across Jubaland State.',
      borderColor: 'border-orange-500'
    },
    { 
      id: 2, 
      title: 'Vaccination Drive Successful in Kismayo', 
      date: '2025-05-28', 
      body: 'Over 5,000 children were successfully vaccinated during the recent vaccination campaign in Kismayo district.',
      borderColor: 'border-[#4988d4]'
    },
    { 
      id: 3, 
      title: 'Awareness Campaign on Cholera Prevention', 
      date: '2025-05-20', 
      body: 'A community-wide awareness campaign on cholera prevention measures has been launched in response to recent outbreaks.',
      borderColor: 'border-green-500'
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent News Post</h2>
      <ul className="space-y-4">
        {newsItems.map(news => (
          <li 
            key={news.id} 
            className={`pl-4 py-2 border-l-4 ${news.borderColor} bg-white rounded shadow-sm`}
          >
            <p className="text-sm text-gray-500 mb-1">Date Posted: {news.date}</p>
            <h3 className="text-md font-medium text-gray-800 mb-1">{news.title}</h3>
            <p className="text-sm text-gray-600">{news.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentNews;