"use client";
import React, { useState } from "react";
import style from "./sign.module.css";
import InputForm from "@/util/input/InputForm";
import { $api } from "@/shared/lib/api/api";
import { useRouter } from "next/navigation";

interface InputArrayType {
  [key: string]: string;
}

const ArrayId = [
  { id: "name", value: "Name" },
  { id: "surname", value: "Surname" },
  { id: "username", value: "Username" },
  { id: "dateofbirthday", value: "Day of birthday" },
  { id: "phone", value: "Phone" },
  { id: "mail", value: "Mail" },
  { id: "password", value: "Password" },
  { id: "passwordsecond", value: "Password Second" },
];

const Sing = () => {
  const route = useRouter();
  const [data, setData] = useState<InputArrayType>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const onClickRoute = () => {
    route.push("/sign-in");
  };

  const onSendAuth = () => {
    $api.post("auth/register/", data);
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
            <button onClick={onSendAuth}>Зарегистрироваться</button>
            <div className={style.route}>
              <button onClick={onClickRoute}>У меня есть аккаунт</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sing;
