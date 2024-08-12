"use client";
import { useState, MouseEvent } from "react";
import style from "./addschedules.module.css";
import { $api } from "@/shared/lib/api/api";

interface RequestSchedules {
  date: string;
  start_time: string;
  end_time: string;
}

const AddSchedules: React.FC = () => {
  const currentDate = new Date();

  const [dataSchedules, setDataSchedules] = useState<RequestSchedules>({
    date: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`,
    start_time: "",
    end_time: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      .then((req) => console.log(req.status))
      .catch((error) => console.error("Error sending schedules:", error));
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
      </div>
      <div className={style.button_form}>
        <button onClick={handleSendSchedules}>Отправить</button>
      </div>
    </div>
  );
};

export default AddSchedules;
