"use client";
import React, { useState } from "react";
import style from "./date.module.css"

const getDaysInMonth = (month: any, year: any) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);

  const daysInMonth = getDaysInMonth(month, year);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className={style.date_container}>
      <div className={style.pogination}>
        <button onClick={handlePrevMonth}>Previous</button>
        <span>
          {months[month]} {year}
        </span>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", width: "280px", }}>
        {Array.from({ length: daysInMonth }, (_, index) => (
          <div
            key={index}
            style={{
              width: "40px",
              height: "40px",
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
