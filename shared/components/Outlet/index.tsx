"use client";
import { useState } from "react";
import style from "@/shared/components/Outlet/outlet.module.css";
import InputForm from "@/util/input/InputForm";
import { $api } from "@/shared/lib/api/api";

interface Option {
  value: string;
  label: string;
}

interface DataOutlet {
  month?: string;
  day?: string;
  timeFrom?: string;
  timeTo?: string;
  client?: string | null;
  banker?: string;
}

const months: Option[] = [
  { value: "1", label: "Январь" },
  { value: "2", label: "Февраль" },
  { value: "3", label: "Март" },
  { value: "4", label: "Апрель" },
  { value: "5", label: "Май" },
  { value: "6", label: "Июнь" },
  { value: "7", label: "Июль" },
  { value: "8", label: "Август" },
  { value: "9", label: "Сентябрь" },
  { value: "10", label: "Октябрь" },
  { value: "11", label: "Ноябрь" },
  { value: "12", label: "Декабрь" },
];

const timeOptions: Option[] = Array.from({ length: 10 }, (_, i) => ({
  value: (i + 10).toString().padStart(2, "0") + ":00",
  label: (i + 10).toString().padStart(2, "0") + ":00",
}));

const Outlet = () => {
  const [dataOutlet, setDataOutlet] = useState<DataOutlet>({});
  const [days, setDays] = useState<Option[]>([]);

  const handleChangeValueInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;

    setDataOutlet((prevDataOutlet) => {
      let newDataOutlet = {
        ...prevDataOutlet,
        [id]: value,
      };

      if (id === "timeFrom") {
        const nextHour = (parseInt(value.slice(0, 2), 10) + 1)
          .toString()
          .padStart(2, "0");
        const timeToValue = `${nextHour}:00`;
        newDataOutlet = {
          ...newDataOutlet,
          timeTo: timeToValue,
        };
      }

      if (id === "month") {
        const daysInMonth = new Date(2024, Number(value), 0).getDate();
        setDays(
          Array.from({ length: daysInMonth }, (_, i) => ({
            value: (i + 1).toString(),
            label: (i + 1).toString(),
          }))
        );
      }

      return newDataOutlet;
    });
  };

  const formatBookingDate = (
    month?: string,
    day?: string,
    time?: string
  ): string | undefined => {
    if (!month || !day || !time) return undefined;
    return `${day.padStart(2, "0")}:${month.padStart(2, "0")}:2024 ${time}`;
  };

  const handleOnSendBooking = () => {
    const booking_start_time = formatBookingDate(
      dataOutlet.month,
      dataOutlet.day,
      dataOutlet.timeFrom
    );
    const booking_end_time = formatBookingDate(
      dataOutlet.month,
      dataOutlet.day,
      dataOutlet.timeTo
    );

    const userInfo = localStorage.getItem("userInfo");
    const username = userInfo && JSON.parse(userInfo).id;

    const bookingData = {
      banker: dataOutlet.banker,
      booking_start_time,
      booking_end_time,
      date: `${dataOutlet.month}:${dataOutlet.day}`,
      client: username,
    };

    $api.post("bookings/", bookingData);
  };

  return (
    <div className={style.outlet_container}>
      <div className={style.outlet_formDate}>
        <div className={style.outlet_select}>
          <InputForm
            onChange={handleChangeValueInput}
            options={months}
            type={"select"}
            id={"month"}
          />
        </div>
        <div className={style.outlet_select}>
          <InputForm
            onChange={handleChangeValueInput}
            options={days}
            type={"select"}
            id={"day"}
          />
        </div>
        <div className={style.outlet_select}>
          <label htmlFor="timeFrom">Время от:</label>
          <select
            id="timeFrom"
            className={style.selectTime}
            onChange={handleChangeValueInput}
          >
            {timeOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className={style.outlet_select}>
          <label htmlFor="timeTo">Время до:</label>
          <select
            id="timeTo"
            className={style.selectTime}
            onChange={handleChangeValueInput}
            value={dataOutlet.timeTo}
          >
            {timeOptions
              .filter(
                (option) =>
                  !dataOutlet.timeFrom || option.value > dataOutlet.timeFrom
              )
              .map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className={style.outlet_select}>
        <label htmlFor="banker">Банкир:</label>
        <input id="banker" type="text" onChange={handleChangeValueInput} />
      </div>
      <button className={style.button} onClick={handleOnSendBooking}>
        Отправить Заявку
      </button>
    </div>
  );
};

export default Outlet;
