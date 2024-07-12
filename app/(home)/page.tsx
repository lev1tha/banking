import React from "react";

import Header from "@/widgets/header/Header";
import style from "@/widgets/styles/home.module.css";

const Home = () => {
  return (
    <div>
      <Header />
      <div className={""}>
        <div className={""}>
          <img src="./assets/image/mobile_bank_24_zc8x9oi.png" alt="" />
        </div>
        <div className="">
          <h1>Мобильдик банк</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
