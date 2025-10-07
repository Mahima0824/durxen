import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calender = () => {
  const [date, setDate] = useState(new Date());

  const darkDates = [24, 25, 26, 27, 28];
  const lightDates = [12, 13, 15, 18, 23];

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const day = date.getDate();
      if (darkDates.includes(day)) return 'dark-day';
      if (lightDates.includes(day)) return 'light-day';
    }
    return null;
  };

  return (
    <Calendar onChange={setDate} value={date} tileClassName={tileClassName} className="bootstrap-calendar" />
  );
};

export default Calender;
