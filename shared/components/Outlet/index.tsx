"use client";
import { useState } from "react";
import style from "@/shared/components/Outlet/outlet.module.css";
import InputForm from "@/util/input/InputForm";

const InputObjectId = [
  { id: 1, name: "banker", placeholder: "Имя банкира" },
  { id: 2, name: "day_of_week", placeholder: "День Недели" },
  { id: 3, name: "month", placeholder: "Месяц" },
  { id: 4, name: "booking_start_time", placeholder: "Начала сеанса" },
  { id: 5, name: "booking_end_time", placeholder: "Конец сеанса" },
  { id: 6, name: "confirmed", placeholder: "Подтверждение" },
];

const Outlet = () => {
  const [dataOutlet, setDataOutlet] = useState<Object>({});

  const handleChangeValueInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setDataOutlet((prevDataOutlet) => ({
      ...prevDataOutlet,
      [id]: value,
    }));
  };

  console.log(dataOutlet);

  return (
    <div className={style.outlet_container}>
      {InputObjectId.map((item: any, index: number) => {
        if (item.id == index) {
        }
        return (
          <InputForm
            key={index}
            onChange={handleChangeValueInput}
            type={"text"}
            id={item.name}
            placeholder={item.placeholder}
          />
        );
      })}
    </div>
  );
};

export default Outlet;
