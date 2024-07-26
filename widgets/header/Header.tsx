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
        <Link href={"/date"}>
          <p>Календарь</p>
        </Link>
        <Link href={"/ordered"}>
          <p>Забронировать сразу</p>
        </Link>
        <Link href={"/profile"}>
          <p>Мой Профиль</p>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
