import React from "react";
import style from "@/shared/styles/ordered.module.css";
import Header from "@/widgets/header/Header";
import Outlet from "@/shared/components/Outlet";

const page = () => {
  return (
    <>
      <Header />
      <div className={style.order_container}>
        <div className={style.layout}>
          <nav className={style.layout_nav}>
            <a href="">Забронировать время</a>
            <a href="">Узнать кто на смене</a>
            <a href="">FAQs</a>
            <a href="">Справочный номер</a>
            <a href="">Доступ к чату</a>
          </nav>
        </div>
        <div className={style.outlet}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default page;
