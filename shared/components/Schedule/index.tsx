"use client";
import { $api, $token } from "@/shared/lib/api/api";
import React, { useState, useEffect } from "react";

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

const Schedule: React.FC = () => {
  const [dataWorker, setDataWorker] = useState<RequestWork[][]>();

  const userInfo = localStorage.getItem("userInfo");
  const username = userInfo && JSON.parse(userInfo).id;
  useEffect(() => {
    $api
      .get("work-schedules/", {
        headers: {
          Authorization: `Token ${$token}`,
        },
      })
      .then((req) => setDataWorker(req.data));
  }, []);

  console.log(dataWorker);
  return <div>Schedule</div>;
};

export default Schedule;
