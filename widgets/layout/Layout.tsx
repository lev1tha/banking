"use client";
import React, { useEffect, useState } from "react";
import style from "./layout.module.css";
import Link from "next/link";
import { $api } from "@/shared/lib/api/api";

const Layout: React.FC = () => {
  const [banker, setBankder] = useState<string>("");

  useEffect(() => {
    $api.get("auth/profile/").then((response) => {
      setBankder(response.data.role);
    });
  });

  return (
    <div className={style.layout_profile}>
      <Link href={"/profile"}>
        <p>Профиль</p>
      </Link>
      <Link href={"/profile/changepassword"}>
        <p>Поменять Пароль</p>
      </Link>
      <Link href={"/profile/changeuser"}>
        <p>Поменять Профиль</p>
      </Link>
      {banker === "banker" && (
        <Link href={"/profile/add-schedules"}>
          <p>Добавить смену</p>
        </Link>
      )}
    </div>
  );
};

export default Layout;
