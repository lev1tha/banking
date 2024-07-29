"use client";
import React, { useEffect, useState } from "react";
import { $api, $token } from "@/shared/lib/api/api";

const page = () => {
  const [dataWorking, setDataWorking] = useState<Object>();

  const handleBankerChedules = () => {
    useEffect(() => {
      $api.post("work-schedules/", dataWorking, {
        headers: {
          Authorization: `Token ${$token}`,
        },
      });
    }, []);
  };

  return (
    <>
      <div></div>
    </>
  );
};

export default page;
