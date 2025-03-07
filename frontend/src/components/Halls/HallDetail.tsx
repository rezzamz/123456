import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HallDetail.css';

interface Hall {
  id: number;
  name: string;
  owner: string;
  initial_weight: number;
  start_date: string;
  chicken_type: string;
  input_method: string;
}

interface DailyData {
  food_consumed: number;
  water_consumed: number;
  average_weight: number;
  mortality: number;
}

const HallDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hall, setHall] = useState<Hall | null>(null);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [foodConsumed, setFoodConsumed] = useState('');
  const [waterConsumed, setWaterConsumed] = useState('');
  const [averageWeight, setAverageWeight] = useState('');
  const [mortality, setMortality] = useState('');

  useEffect(() => {
    const fetchHall = async () => {
      const response = await axios.get<Hall>(`http://127.0.0.1:8000/api/halls/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setHall(response.data);
    };

    const fetchDailyData = async () => {
      const response = await axios.get<DailyData[]>(`http://127.0.0.1:8000/api/halls/${id}/daily-data`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDailyData(response.data);
    };

    fetchHall();
    fetchDailyData();
  }, [id]);

  const handleAddDailyData = async () => {
    try {
      await axios.post<DailyData>(`http://127.0.0.1:8000/api/halls/${id}/daily-data`, {
        food_consumed: Number(foodConsumed),
        water_consumed: Number(waterConsumed),
        average_weight: Number(averageWeight),
        mortality: Number(mortality)
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFoodConsumed('');
      setWaterConsumed('');
      setAverageWeight('');
      setMortality('');
      const response = await axios.get<DailyData[]>(`http://127.0.0.1:8000/api/halls/${id}/daily-data`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDailyData(response.data);
    } catch (error) {
      alert('خطایی رخ داده است');
    }
  };

  return (
    <div className="hall-detail-container">
      <h1>جزئیات سالن</h1>
      {hall && (
        <>
          <h2>{hall.name}</h2>
          <p>نام وارد کننده: {hall.owner}</p>
          <p>تاریخ جوجه ریزی: {hall.start_date}</p>
          <p>نوع جوجه: {hall.chicken_type}</p>
          <p>نحوه وارد کردن اطلاعات: {hall.input_method}</p>
        </>
      )}
      <div className="daily-data-form">
        <h3>اضافه کردن اطلاعات روزانه</h3>
        <input
          type="text"
          placeholder="مقدار خوراک مصرفی (کیلوگرم)"
          value={foodConsumed}
          onChange={(e) => setFoodConsumed(e.target.value)}
        />
        <input
          type="text"
          placeholder="مقدار آب مصرفی (لیتر)"
          value={waterConsumed}
          onChange={(e) => setWaterConsumed(e.target.value)}
        />
        <input
          type="text"
          placeholder="وزن متوسط جوجه (گرم)"
          value={averageWeight}
          onChange={(e) => setAverageWeight(e.target.value)}
        />
        <input
          type="text"
          placeholder="تلفات"
          value={mortality}
          onChange={(e) => setMortality(e.target.value)}
        />
        <button onClick={handleAddDailyData}>افزودن</button>
      </div>
      <div className="daily-data-list">
        <h3>اطلاعات روزانه</h3>
        <ul>
          {dailyData.map((data, index) => (
            <li key={index}>
              <p>روز {index + 1}</p>
              <p>خوراک مصرفی: {data.food_consumed} کیلوگرم</p>
              <p>آب مصرفی: {data.water_consumed} لیتر</p>
              <p>وزن متوسط جوجه: {data.average_weight} گرم</p>
              <p>تلفات: {data.mortality}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HallDetail;