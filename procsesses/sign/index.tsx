"use client";
import React, { useState } from "react";
import style from "./sign.module.css";
import InputForm from "@/util/input/InputForm";
import { $api } from "@/shared/lib/api/api";
import { useRouter } from "next/navigation";

interface InputArrayType {
  [key: string]: string;
}

interface StepItem {
  id: string;
  value: string;
  type: string;
  options?: { value: string; label: string }[];
}

const steps: StepItem[][] = [
  [
    { id: "first_name", value: "Name", type: "text" },
    { id: "last_name", value: "Surname", type: "text" },
  ],
  [
    { id: "avatar", value: "Avatar", type: "text" },
    { id: "username", value: "Username", type: "text" },
  ],
  [
    {
      id: "role",
      value: "Role",
      type: "select",
      options: [
        { value: "employee", label: "Сотрудник" },
        { value: "client", label: "Клиент" },
      ],
    },
  ],
  [
    { id: "date_of_birth", value: "Day of birthday: YYYY.MM.DD", type: "date" },
    { id: "phone", value: "Phone", type: "text" },
  ],
  [
    { id: "email", value: "Mail", type: "email" },
    { id: "password1", value: "Password", type: "password" },
    { id: "password2", value: "Password Second", type: "password" },
  ],
];

const Sing = () => {
  const route = useRouter();
  const [data, setData] = useState<InputArrayType>({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "role" && value === "employee") {
      if (steps.length === 5) {
        steps.splice(3, 0, [
          { id: "employee_id", value: "Employee ID", type: "text" },
          { id: "department", value: "Department", type: "text" },
        ]);
      }
    } else if (id === "role" && value !== "employee" && steps.length === 6) {
      steps.splice(3, 1);
    }
  };

  const onClickRoute = () => {
    route.push("/sign-in");
  };

  const onSendAuth = () => {
    $api.post("auth/register/", data);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <div className={style.container_sign}>
      <div className={style.modal}>
        <div className={style.modal_container}>
          <div className={style.logo}>
            <img src="./assets/image/logotype.png" alt="" />
          </div>
          <div className={style.form}>
            {steps[currentStep].map((item) => (
              <InputForm
                key={item.id}
                id={item.id}
                placeholder={item.value}
                type={item.type}
                options={item.options}
                onChange={handleInputChange}
              />
            ))}
            <div className={style.buttons}>
              {currentStep > 0 && (
                <button onClick={handlePrevStep}>Назад</button>
              )}
              {currentStep < steps.length - 1 && (
                <button onClick={handleNextStep}>Продолжить</button>
              )}
              {currentStep === steps.length - 1 && (
                <button onClick={onSendAuth}>Зарегистрироваться</button>
              )}
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
