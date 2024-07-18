"use client";
import React, { useState } from "react";
import style from "./sign.module.css";
import InputForm from "@/util/input/InputForm";
import { $api } from "@/shared/lib/api/api";
import { useRouter } from "next/navigation";

interface InputArrayType {
  [key: string]: string;
}

const steps = [
  [
    { id: "first_name", value: "Name" },
    { id: "last_name", value: "Surname" },
  ],
  [
    { id: "avatar", value: "Avatar" },
    { id: "username", value: "Username" },
  ],
  [
    { id: "date_of_birth", value: "Day of birthday: YYYY.MM.DD" },
    { id: "phone", value: "Phone" },
  ],
  [
    { id: "email", value: "Mail" },
    { id: "password1", value: "Password" },
    { id: "password2", value: "Password Second" },
  ],
];

const Sing = () => {
  const router = useRouter();
  const [data, setData] = useState<InputArrayType>({});
  const [step, setStep] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onSendAuth();
    }
  };

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onClickRoute = () => {
    router.push("/sign-in");
  };

  const onSendAuth = () => {
    $api.post("auth/register/", data);
  };

  return (
    <div className={style.container_sign}>
      <div className={style.modal}>
        <div className={style.modal_container}>
          <div className={style.logo}>
            <img src="./assets/image/logotype.png" alt="Logo" />
          </div>
          <div className={style.form}>
            {steps[step].map((item) => (
              <InputForm
                key={item.id}
                id={item.id}
                placeholder={item.value}
                onChange={handleInputChange}
              />
            ))}
            <div className={style.buttons}>
              {step > 0 && <button onClick={handlePreviousStep}>Назад</button>}
              <button onClick={handleNextStep}>
                {step < steps.length - 1 ? "Продолжить" : "Зарегистрироваться"}
              </button>
            </div>
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
