"use client";
import { $api, $token } from "@/shared/lib/api/api";
import React, { useState, useEffect } from "react";
import style from "./schedule.module.css";

interface RequestWork {
  count: number;
  next: number;
  previous: number;
  result: {
    id: number;
    date: string;
    start_time: string;
    end_time: string;
    user: number;
  };
}

const TestPlug = [
  {
    id: 1,
    date: "2024-07-30",
    start_time: "8:00",
    end_time: "16:00",
    user: "up1mep",
  },
  {
    id: 2,
    date: "2024-07-30",
    start_time: "8:00",
    end_time: "16:00",
    user: "7kadenzo",
  },
  {
    id: 3,
    date: "2024-07-30",
    start_time: "8:00",
    end_time: "16:00",
    user: "adinadina",
  },
  {
    id: 4,
    date: "2024-07-30",
    start_time: "8:00",
    end_time: "16:00",
    user: "mars",
  },
  {
    id: 5,
    date: "2024-07-30",
    start_time: "8:00",
    end_time: "16:00",
    user: "pluton.zxc",
  },
];

const Schedule: React.FC = () => {
  const [dataWorker, setDataWorker] = useState<RequestWork[][]>();

  useEffect(() => {
    $api
      .get("work-schedules/", {
        headers: {
          Authorization: `Token ${$token}`,
        },
      })
      .then((req) => setDataWorker(req.data));
  }, []);

  return (
    <div className={style.schedules_container}>
      {TestPlug.map((item: any, index: number) => (
        <div key={index} className={style.worker_container}>
          <div className={style.user_information}>
            <h1>{item.user}</h1>
          </div>
          <div className={style.work_time}>
            <span> Дата когда он будет работать: {item.date}</span>
          </div>
          <div className={style.start_n_end_time}>
            <span>
              Начало смены: {item.start_time},<br />
              Конец смены: {item.end_time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
