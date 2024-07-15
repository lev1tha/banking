"use client";
import React, { useState } from "react";
import style from "./sign.module.css";
import InputForm from "@/util/input/InputForm";

interface InputArrayType {
  [key: string]: string;
}

const ArrayId = [
  { id: "name", value: "Name" },
  { id: "surname", value: "Surname" },
  { id: "username", value: "Username" },
  { id: "dateofbirthday", value: "Day of birthdat" },
  { id: "phone", value: "Phone" },
  { id: "mail", value: "Mail" },
  { id: "password", value: "Password" },
  { id: "passwordsecond", value: "Password Second" },
];

const Sing = () => {
  const [data, setData] = useState<InputArrayType>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className={style.container_sign}>
      <div className={style.modal}>
        <div className={style.modal_container}>
          <div className={style.logo}>
            <img src="./assets/image/logotype.png" alt="" />
          </div>
          <div className={style.form}>
            {ArrayId.map((item) => (
              <InputForm
                id={item.id}
                placeholder={item.value}
                onChange={handleInputChange}
              />
            ))}
            <button>Зарегистрироваться</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sing;
