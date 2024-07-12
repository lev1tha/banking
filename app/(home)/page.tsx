import React from "react";

import Header from "@/widgets/header/Header";
import style from "@/shared/styles/home.module.css";

const Home = () => {
  return (
    <div>
      <Header />
      <div className={style.main}>
        <div className={style.mobile}>
          <div className="image">
            <img src="./assets/image/mobile_bank.png" alt="" />
          </div>
          <div className="text">
            <div className={style.title}>
              <h1>RSK 24/7 Мобильный банк</h1>
            </div>
            <div className="suptitle">
              <p>
                Установи и расслабься, в банкинге есть возможность получить
                онлайн кредит
              </p>
            </div>
          </div>
        </div>
        <div className={style.course}>
          <h1>Мобильдик банк</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
