import React from "react";

import style from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.logotype}>
        <img src="./assets/image/rskBank.png" alt="" /> {/* logotype */}
      </div>
      <nav className={style.navigation}>
        <Link href={"/about"}>
          <p>О Компаний</p>
        </Link>
        <Link href={"/time"}>
          <p>Выбор времени</p>
        </Link>
        <Link href={"/collaborator"}>
          <p>Выбор Сотрудника</p>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
