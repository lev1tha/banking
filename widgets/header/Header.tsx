"use client";
import React, { useEffect, useState } from "react";
import style from "./header.module.css";
import Link from "next/link";
import MobileMenu from "@/shared/components/MobileNav";
import { globalAfterCheckerUser } from "@/shared/lib/api/api";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await globalAfterCheckerUser();
      setIsAuthenticated(authStatus);
    };

    checkAuth();
  }, []);

  const handleLogoutUser = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={style.header}>
      <div className={style.logotype}>
        <img src="/assets/image/rskBank.png" alt="logotype" />
      </div>
      <button
        className={`${style.menuButton} ${isMobileMenuOpen ? "open" : ""}`}
        onClick={handleToggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`${style.navigation} ${isMobileMenuOpen ? "open" : ""}`}>
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
      {isMobileMenuOpen && <MobileMenu onClose={handleToggleMenu} />}
    </div>
  );
};

export default Header;
