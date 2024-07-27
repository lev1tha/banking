import React from "react";
import style from "./layout.module.css";
import Link from "next/link";

const Layout = () => {
  return (
    <div className={style.layout_profile}>
      <Link href={"/profile/changepassword"}>
        <p>Поменять Пароль</p>
      </Link>
      <Link href={"/profile/changeuser"}>
        <p>Поменять Профиль</p>
      </Link>
    </div>
  );
};

export default Layout;
