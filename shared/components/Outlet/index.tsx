"use client";
import { useEffect, useState } from "react";
import style from "@/shared/components/Outlet/outlet.module.css";
import InputForm from "@/util/input/InputForm";
import { $api } from "@/shared/lib/api/api";

const ArrayFromBooking = [
  {
    id: "month",
    option: [
      { value: "1", label: "Январь" },
      { value: "2", label: "Февраль" },
      { value: "3", label: "Март" },
      { value: "4", label: "Апрель" },
      { value: "5", label: "Май" },
      { value: "6", label: "Июнь" },
      { value: "7", label: "Июль" },
      { value: "8", label: "Август" },
      { value: "9", label: "Сентрябрь" },
      { value: "10", label: "Октябрь" },
      { value: "11", label: "Ноябрь" },
      { value: "12", label: "Декабрь" },
    ],
  },
];

// Сам создал и забыл принцип InputForm ХАХАХ, мда коротко о моей памяти D:

// для того что бы перебрать массив из месяцов, не знаю почему но Back-End принимает именно числами,
// что бы клиент не встал в ступор визуально буду показывать month, отправлять на Back-End id месяца

const Outlet = () => {
  const [dataOutlet, setDataOutlet] = useState<Object>({});
  const [onShift, setOnShift] = useState<any>([]);

  useEffect(() => {
    $api.get("workschedule/").then((req) => setOnShift(req.data));
  }, []);
  // Запрос для получение кол-во сотрудников которые выходят на смену

  const handleChangeValueInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setDataOutlet((prevDataOutlet) => ({
      ...prevDataOutlet,
      [id]: value,
    }));
  };
  // Функция для заполнение объекта и отправление на сервер

  const handleOnSendBooking = () => {
    $api.post("booking/", dataOutlet);
  };
  //  Отправление Post запроса на сервер, при первычном вышли ошибки связанные с месяцами
  // именно после этого я начал рефокторинг

  console.log(dataOutlet);

  return (
    <div className={style.outlet_container}>
      <div className={style.outlet_select}>
        {ArrayFromBooking.map((item: any, index: number) => (
          <InputForm
            key={index}
            onChange={handleChangeValueInput}
            options={item.option}
            type={"select"}
            id={item.id}
          />
        ))}
      </div>

      <select className={style.outlet_select}>
        {onShift.map((item: any, index: number) => (
          <option key={index}>{item.user}</option>
        ))}
      </select>

      <button onClick={handleOnSendBooking}>Отправить Заявку</button>
    </div>
  );
};

export default Outlet;
