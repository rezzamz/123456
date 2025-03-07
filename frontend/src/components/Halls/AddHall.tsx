import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddHall.css';

const AddHall: React.FC = () => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [initialWeight, setInitialWeight] = useState('');
  const [startDate, setStartDate] = useState('');
  const [chickenType, setChickenType] = useState('');
  const [inputMethod, setInputMethod] = useState('');
  const navigate = useNavigate();

  const handleAddHall = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/halls', {
        name,
        owner,
        initial_weight: initialWeight,
        start_date: startDate,
        chicken_type: chickenType,
        input_method: inputMethod
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/halls');
    } catch (error) {
      alert('خطایی رخ داده است');
    }
  };

  return (
    <div className="add-hall-container">
      <h1>اضافه کردن سالن</h1>
      <input
        type="text"
        placeholder="نام سالن"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="نام وارد کننده اطلاعات"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <input
        type="text"
        placeholder="وزن روز صفر"
        value={initialWeight}
        onChange={(e) => setInitialWeight(e.target.value)}
      />
      <input
        type="date"
        placeholder="تاریخ جوجه ریزی"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <select value={chickenType} onChange={(e) => setChickenType(e.target.value)}>
        <option value="">نوع جوجه</option>
        <option value="type1">نوع 1</option>
        <option value="type2">نوع 2</option>
      </select>
      <select value={inputMethod} onChange={(e) => setInputMethod(e.target.value)}>
        <option value="">نحوه وارد کردن اطلاعات</option>
        <option value="daily">روزانه</option>
        <option value="weekly">هفتگی</option>
      </select>
      <button onClick={handleAddHall}>ثبت</button>
    </div>
  );
};

export default AddHall;