"use client";
import React, { useState } from "react";
import style from "./signin.module.css";
import InputForm from "@/util/input/InputForm";
import { $api } from "@/shared/lib/api/api";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";

interface InputArrayType {
  [key: string]: string;
}

interface ErrorArrayType {
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
    { id: "first_name", value: "Имя", type: "text" },
    { id: "last_name", value: "Фамилия", type: "text" },
  ],
  [
    {
      id: "role",
      value: "Role",
      type: "select",
      options: [
        { value: "banker", label: "Сотрудник" },
        { value: "client", label: "Клиент" },
      ],
    },
    { id: "username", value: "Пользовательское имя", type: "text" },
  ],
  [
    { id: "date_of_birth", value: "Дата рождения: YYYY.MM.DD", type: "date" },
    { id: "phone", value: "Номер телефона", type: "text" },
  ],
  [
    { id: "email", value: "Почта", type: "email" },
    { id: "password1", value: "Пароль", type: "password" },
    { id: "password2", value: "Пароль еще раз", type: "password" },
  ],
];

const Sing = () => {
  const route = useRouter();
  const [data, setData] = useState<InputArrayType>({});
  const [errors, setErrors] = useState<ErrorArrayType>({});
  const [avatar, setAvatar] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const validateStep = (): boolean => {
    const currentErrors: ErrorArrayType = {};
    steps[currentStep].forEach((item) => {
      if (!data[item.id] && item.type !== "file") {
        currentErrors[
          item.id
        ] = `${item.value} обязательное поле для заполнения`;
      }
    });

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;

    if (event.target instanceof HTMLInputElement && event.target.files) {
      const files = event.target.files;
      if (id === "avatar" && files.length > 0) {
        setAvatar(files[0]);
      }
    } else {
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }

    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }

    if (id === "role" && value === "banker") {
      if (steps.length === 4) {
        steps.splice(3, 0, [
          { id: "experience", value: "Опыт работы", type: "text" },
          { id: "position", value: "Позиция", type: "text" },
          { id: "avatar", value: "Фото", type: "file" },
        ]);
      }
    } else if (id === "role" && value !== "banker" && steps.length === 5) {
      steps.splice(3, 1);
    }
  };

  const onClickRoute = () => {
    route.push("/sign-up");
  };

  const onSendAuth = () => {
    if (validateStep()) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (avatar) {
        formData.append("avatar", avatar);
      }

      $api
        .post("auth/register/", formData)
        .then((response: AxiosResponse<{ token: string }>) => {
          const { token } = response.data;
          localStorage.setItem("token", token);
          route.push("/");
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    }
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    }
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
              <div key={item.id}>
                <InputForm
                  id={item.id}
                  placeholder={item.value}
                  type={item.type}
                  options={item.options}
                  onChange={handleInputChange}
                />
                {errors[item.id] && (
                  <span className={style.error}>{errors[item.id]}</span>
                )}
              </div>
            ))}
            <div className={style.buttons}>
              {currentStep < steps.length - 1 && (
                <button onClick={handleNextStep}>Продолжить</button>
              )}
              {currentStep === steps.length - 1 && (
                <button onClick={onSendAuth}>Зарегистрироваться</button>
              )}
              {currentStep > 0 && (
                <button onClick={handlePrevStep}>Назад</button>
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
