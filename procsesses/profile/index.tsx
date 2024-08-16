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
  avatar?: string;
  experience?: string;
  position?: string;
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
  avatar: "Аватар",
  experience: "Опыт",
  position: "Вид правления",
};

const Index: React.FC = () => {
  const [viewProfile, setViewProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    $api
      .get("auth/profile/")
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
        <div className={style.shape}>
          {viewProfile.avatar && (
            <div className={style.profile_item}>
              <img
                src={viewProfile.avatar}
                alt="User Avatar"
                className={style.avatar}
              />
            </div>
          )}
          <div>
            {Object.entries(viewProfile).map(
              ([key, value]) =>
                key !== "id" &&
                key !== "avatar" && (
                  <div key={key} className={style.profile_item}>
                    <p>{translations[key] || key}:</p> <span>{value}</span>
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Index;
