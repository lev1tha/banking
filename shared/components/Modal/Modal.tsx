"use client";
import { useEffect, useState } from "react";
import style from "./modal.module.css";
import { $api } from "@/shared/lib/api/api";
import { useRouter } from "next/navigation";

interface ModalPropsT {
  isSelectedDay: number | null;
}

const Modal: React.FC<ModalPropsT> = ({ isSelectedDay }) => {
  const [dataReq, setDataReq] = useState({});
  const [error, setError] = useState<string>();
  const route = useRouter();

  useEffect(() => {
    $api
      .get(`dayofweek/${isSelectedDay}`)
      .then((req) => setDataReq(req))
      .catch((er) => setError("Возникла какая-то ошибка попробуйте позже"));
  }, [dataReq]);

  const onClickRoute = () => {
    route.push("/ordered");
  };

  return (
    <div className={style.modal_container}>
      <span>
        Выбранный день: <h1>{isSelectedDay}</h1>
      </span>
      <div className="modal_information">
        {/* {error || ( */}
          <>
            <table border={1} className={style.modal_table}>
              <tr>
                <td></td>
                <td>От</td>
                <td>До</td>
                <td>У кого</td>
                <td>Кем</td>
              </tr>
              <tr>
                <td>Время</td>
                <td>16:00</td>
                <td>18:00</td>
                <td>Женишбеков</td>
                <td>Алмаз уулу</td>
              </tr>
              <tr>
                <td>Время</td>
                <td>16:00</td>
                <td>18:00</td>
                <td>Женишбеков</td>
                <td>Маткеримов</td>
              </tr>
              <tr>
                <td>Время</td>
                <td>16:00</td>
                <td>18:00</td>
                <td>Женишбеков</td>
                <td>Элдосов</td>
              </tr>
            </table>

            <button className={style.button} onClick={onClickRoute}>
              Забранировать в этот день
            </button>
          </>
        {/* )} */}
      </div>
    </div>
  );
};

export default Modal;
