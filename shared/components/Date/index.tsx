"use client";
import React, { useState } from "react";
import style from "./date.module.css";
import { cn } from "@udecode/cn";
import Modal from "../Modal/Modal";

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  let day: number;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [significance, setSignificance] = useState<boolean>();
  const [isModalCall, setIsModalCall] = useState<boolean>(false);
  const [isSelectedDay, setSelectedDay] = useState<number | null>(null);

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

  const isPastDate = (day: number) => {
    return (
      year < currentYear ||
      (year === currentYear && month < currentMonth) ||
      (year === currentYear && month === currentMonth && day <= currentDay)
    );
  };

  const handleCallModal = (day: number, index: number) => {
    if (!isPastDate(day)) {
      setSelectedDay(index + 1);
      setIsModalCall((prev) => !prev);
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
      <div className={style.calendar_container}>
        <div className={style.dates}>
          {Array.from({ length: daysInMonth }, (_, index) => {
            day = index + 1;
            return (
              <div
                key={index}
                className={cn(
                  isPastDate(day)
                    ? `${style.pastday} ${style.date}`
                    : `${style.dayactive} ${style.date}`
                )}
                onClick={() => handleCallModal(day, index)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      {isModalCall && <Modal isSelectedDay={isSelectedDay} />}
    </div>
  );
};

export default Calendar;
