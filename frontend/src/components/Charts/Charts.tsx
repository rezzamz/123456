import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './Charts.css';

interface DailyData {
  day: number;
  food_consumed: number;
  water_consumed: number;
  average_weight: number;
  mortality: number;
}

const Charts: React.FC = () => {
  const [data, setData] = useState<DailyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<DailyData[]>('http://127.0.0.1:8000/api/halls/1/daily-data', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setData(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="charts-container">
      <h1>Daily Data Charts</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="food_consumed" fill="#8884d8" />
          <Bar dataKey="water_consumed" fill="#82ca9d" />
          <Bar dataKey="average_weight" fill="#ffc658" />
          <Bar dataKey="mortality" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;