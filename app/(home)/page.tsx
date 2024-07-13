import React from "react";

import Header from "@/widgets/header/Header";
import Courses from "@/shared/components/Course";
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
          <div className={style.text}>
            <div className={style.title}>
              <h1>RSK 24/7 Мобильный банк</h1>
            </div>
            <div className={style.suptitle}>
              <p>
                Установи и расслабься, в банкинге есть возможность получить
                онлайн кредит
              </p>
            </div>
          </div>
        </div>
        <div className={style.course}>
          <h1>Курсы Сейчас</h1>
          <div className={style.couse_box}>
            <div className={style.textcourses}>
              <h1>Курс валют :</h1>
              <p>Покупка</p> <p>Продажа</p>
            </div>
            <Courses />
          </div>
        </div>
      </div>
      <div className={style.suggestions}>
        <img src="./assets/svg/paper.svg" alt="" />
      </div>
    </div>
  );
};

export default Home;
