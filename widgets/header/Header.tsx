"use client";
import React, { useEffect, useState } from "react";
import style from "./header.module.css";
import Link from "next/link";
import { globalAfterCheckerUser } from "@/shared/lib/api/api";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await globalAfterCheckerUser();
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  const handleLogoutUser = () => {
    localStorage.clear();

    setIsAuthenticated((prev) => !prev);
  };

  return (
    <div className={style.header}>
      <div className={style.logotype}>
        <img src="/assets/image/rskBank.png" alt="logotype" />
      </div>
      <nav className={style.navigation}>
        <Link href={"/date"}>
          <p>Календарь</p>
        </Link>
        <Link href={"/ordered"}>
          <p>Забронировать сразу</p>
        </Link>
        <Link href={"/profile"}>
          <p>Мой Профиль</p>
        </Link>
        <Link href={"/list-banker"}>
          <p>Список Банкиров</p>
        </Link>
        {isAuthenticated ? (
          <Link href={"/"} onClick={handleLogoutUser}>
            <p>Выйти</p>
          </Link>
        ) : (
          <Link href={"/sign-up"}>
            <p>Войти</p>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
