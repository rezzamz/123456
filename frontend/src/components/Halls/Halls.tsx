import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Halls.css';

interface Hall {
  id: number;
  name: string;
}

const Halls: React.FC = () => {
  const [halls, setHalls] = useState<Hall[]>([]);

  useEffect(() => {
    const fetchHalls = async () => {
      const response = await axios.get<Hall[]>('http://127.0.0.1:8000/api/halls', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setHalls(response.data);
    };

    fetchHalls();
  }, []);

  return (
    <div className="halls-container">
      <h1>سالن‌ها</h1>
      <div className="hall-cards">
        {halls.map(hall => (
          <div key={hall.id} className="hall-card">
            <Link to={`/hall-detail/${hall.id}`}>
              <h3>{hall.name}</h3>
            </Link>
          </div>
        ))}
        <div className="hall-card add-hall">
          <Link to="/add-hall">+</Link>
        </div>
      </div>
    </div>
  );
};

export default Halls;