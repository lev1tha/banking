import React from "react";
import style from "./mobilenav.module.css";
import Link from "next/link";

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={style.mobileMenu}>
      <button className={style.closeButton} onClick={onClose}>
        ×
      </button>
      <nav className={style.mobileNavigation}>
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
      </nav>
    </div>
  );
};

export default MobileMenu;
