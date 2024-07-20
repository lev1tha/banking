import React from "react";
import style from "./modal.module.css";

interface ModalPropsT {
  isSelectedDay: number | null;
}

const Modal: React.FC<ModalPropsT> = ({ isSelectedDay }) => {
  return (
    <div className={style.modal_container}>
      Modal: <p>{isSelectedDay}</p>
    </div>
  );
};

export default Modal;
