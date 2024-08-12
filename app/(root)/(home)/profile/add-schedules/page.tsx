"use client";
import { useState, useEffect, MouseEvent } from "react";
import style from "./addschedules.module.css";
import { $api } from "@/shared/lib/api/api";

interface RequestSchedules {
  date: string;
  start_time: string;
  end_time: string;
  end_of_work_week: string;
}

const AddSchedules: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

  const [dataSchedules, setDataSchedules] = useState<RequestSchedules>({
    date: formattedDate,
    start_time: "",
    end_time: "",
    end_of_work_week: "",
  });

  const [error, setError] = useState("");
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    const datesInCurrentMonth = [];
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const dayOfWeek = date.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
        datesInCurrentMonth.push(formattedDate);
      }
    }

    setAvailableDates(datesInCurrentMonth);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setDataSchedules((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSendSchedules = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    $api
      .post("work-schedules/", dataSchedules)
      .then((req) =>
        console.log("Schedule submitted successfully:", req.status)
      )
      .catch((errorReq) => setError(errorReq.response.data?.non_field_errors));
  };

  return (
    <div className={style.container}>
      <div className={style.input_form}>
        <input
          type="text"
          placeholder="Начало смены"
          id="start_time"
          value={dataSchedules.start_time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Конец смены"
          id="end_time"
          value={dataSchedules.end_time}
          onChange={handleInputChange}
        />
        <select
          id="end_of_work_week"
          value={dataSchedules.end_of_work_week}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Выберите конец рабочей недели
          </option>
          {availableDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <span className={style.errorThrow}>{error}</span>
      <div className={style.button_form}>
        <button onClick={handleSendSchedules}>Отправить</button>
      </div>
    </div>
  );
};

export default AddSchedules;
