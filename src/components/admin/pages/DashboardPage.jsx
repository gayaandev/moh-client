import React from 'react';
import AdminLayout from '../components/AdminLayout';
import DashboardCard from '../components/DashboardCard';
import WebsiteTrafficChart from '../components/WebsiteTrafficChart';
import TrafficSourcesChart from '../components/TrafficSourcesChart';
import RecentNews from '../components/RecentNews';
import RecentEvents from '../components/RecentEvents';
import { Users, Newspaper, Folder, Calendar, Mail, Phone, Facebook, Twitter, Linkedin } from 'lucide-react';

const DashboardPage = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <DashboardCard
          title="Total Users"
          value="1,250"
          percentage="12%"
          bgColor="#4988d4"
          icon={Users}
        />
        <DashboardCard
          title="News Posts"
          value="145"
          bgColor="#22c55e"
          icon={Newspaper}
        />
        <DashboardCard
          title="Projects"
          value="48"
          bgColor="#f59e0b"
          icon={Folder}
        />
        <DashboardCard
          title="Events"
          value="32"
          bgColor="#ef4444"
          icon={Calendar}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WebsiteTrafficChart />
        <TrafficSourcesChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <RecentNews />
        <RecentEvents />
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;