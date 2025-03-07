import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Halls from './components/Halls/Halls';
import AddHall from './components/Halls/AddHall';
import HallDetail from './components/Halls/HallDetail';
import Income from './components/Income/Income';
import Settings from './components/Settings/Settings';

const RoutesComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/halls" element={<Halls />} />
        <Route path="/add-hall" element={<AddHall />} />
        <Route path="/hall-detail/:id" element={<HallDetail />} />
        <Route path="/income" element={<Income />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;