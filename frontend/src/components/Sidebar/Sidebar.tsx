import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>منو</h2>
      <ul>
        <li><Link to="/halls">سالن‌ها</Link></li>
        <li><Link to="/income">درآمد</Link></li>
      </ul>
      <div className="sidebar-footer">
        <Link to="/settings">تنظیمات</Link>
        <Link to="/" onClick={() => localStorage.removeItem('token')}>خروج</Link>
      </div>
    </div>
  );
};

export default Sidebar;