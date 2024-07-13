"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./course.module.css";

const COURSEDOLLAR = "https://data.fx.kg/api/v1/average";

const currentDate = new Date();
const dateString = `${currentDate.getUTCFullYear()}-${currentDate.getDate()} / ${currentDate.getHours()}:00`;

interface DataRequest {
  updated_at: null;
  type: null;
  buy_usd: string;
  sell_usd: string;
  buy_eur: string;
  sell_eur: string;
  buy_rub: string;
  sell_rub: string;
  buy_kzt: string;
  sell_kzt: string;
}

const Courses: React.FC = () => {
  const [data, setData] = useState<DataRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(COURSEDOLLAR, {
        headers: {
          Authorization: "Bearer rBpWiZ0x02HvyVRVcYi2tjm0Sfmx2PnGyNhnZWdt349891f1",
        },
      })
      .then((response) => {
        setData([response.data]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const memoizedData = React.useMemo(() => data, [data]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className={style.course}>
      {/* RUB */}
      <div className={style.denominations}>
        <div className={style.images}>
          <div className={style.flag}>
            <img src="./assets/image/russia.png" alt="Russian Flag" />
          </div>
          <div className={style.name_country}>Русский / Рубли</div>
        </div>
        {memoizedData.map((item, index) => (
          <React.Fragment key={index}>
            <div className={style.sale}>
              <p>{item.sell_rub}</p>
            </div>
            <div className={style.buy}>
              <p>{item.buy_rub}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* USD */}
      <div className={style.denominations}>
        <div className={style.images}>
          <div className={style.flag}>
            <img src="./assets/image/USA.png" alt="USA Flag" />
          </div>
          <div className={style.name_country}>USD / Доллары</div>
        </div>
        {memoizedData.map((item, index) => (
          <React.Fragment key={index}>
            <div className={style.sale}>
              <p>{item.sell_usd}</p>
            </div>
            <div className={style.buy}>
              <p>{item.buy_usd}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* EURO */}
      <div className={style.denominations}>
        <div className={style.images}>
          <div className={style.flag}>
            <img src="./assets/image/Euro.png" alt="Euro Flag" />
          </div>
          <div className={style.name_country}>Euro / Евро</div>
        </div>
        {memoizedData.map((item, index) => (
          <React.Fragment key={index}>
            <div className={style.sale}>
              <p>{item.sell_eur}</p>
            </div>
            <div className={style.buy}>
              <p>{item.buy_eur}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className={style.nowday}>
        <p>{dateString}</p>
      </div>
    </div>
  );
};

export default Courses;
