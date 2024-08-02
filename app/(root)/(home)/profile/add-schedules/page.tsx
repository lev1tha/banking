"use client";
import React, { useState, useEffect } from "react";
import { $api, $token } from "@/shared/lib/api/api";
import InputForm from "@/util/input/InputForm";

const Page = () => {
  const [dataWorking, setDataWorking] = useState<Record<string, any>>({});

  const InputValue = [
    { id: "start_date", placeholder: "Начала смены время:" },
    { id: "end_data", placeholder: "Конец смены время:" },
  ];

  const onChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setDataWorking((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handeSendAuth = () => {
    useEffect(() => {
      $api
        .post("work-schedules/", dataWorking, {
          headers: {
            Authorization: `Token ${$token}`,
          },
        })
        .then((response) => {
          console.log("Data sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    }, []);
  };

  return (
    <div>
      <>
        {InputValue.map((item: any, index: number) => (
          <InputForm id={item.id} onChange={onChangeData} />
        ))}
      </>
      <button onClick={handeSendAuth}>Send</button>
    </div>
  );
};

export default Page;
