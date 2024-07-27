"use client";
import React, { useState, useEffect } from "react";
import style from "./profile.module.css";
import { $api } from "@/shared/lib/api/api";

interface UserProfile {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  date_of_birth: string;
  phone: string;
  employee_id?: string;
  department?: string;
  [key: string]: any;
}

const translations: { [key: string]: string } = {
  first_name: "Имя",
  last_name: "Фамилия",
  username: "Пользовательское имя",
  email: "Электронная почта",
  role: "Роль",
  date_of_birth: "Дата рождения",
  phone: "Номер телефона",
  employee_id: "Партия",
  department: "Вид правления",
};

const Index: React.FC = () => {
  const [viewProfile, setViewProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    $api
      .get("auth/profile/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setViewProfile(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
      });
  }, []);

  return (
    <div className={style.container_profile}>
      <h1>Ваш профиль</h1>
      {viewProfile ? (
        <div>
          {Object.entries(viewProfile).map(
            ([key, value]) =>
              key !== "id" && (
                <div key={key} className={style.profile_item}>
                  <p>{translations[key] || key}:</p> <span>{value}</span>
                </div>
              )
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Index;
