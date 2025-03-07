import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>داشبورد</h1>
        {/* محتوای داشبورد */}
      </div>
    </div>
  );
};

export default Dashboard;