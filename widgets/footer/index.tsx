import React from "react";
import style from "./footer.module.css";

const index = () => {
  return (
    <table className={style.table_footer}>
      <td>
        <thead>О Банке</thead>
        <br />
        <tr>История Банка</tr>
        <tr>Руководство Банка</tr>
        <tr>Вакансии</tr>
        <tr>Корресподентская сеть</tr>
        <tr>Контакты</tr>
        <tr>Реквизиты</tr>
        <tr>Пресс-Центр</tr>
        <tr>Филлиалы</tr>
      </td>
      <td>
        <thead>Физические лица</thead>
        <br />
        <tr>Кредиты</tr>
        <tr>Депозиты</tr>
        <tr>Переводы</tr>
        <tr>Тарифы</tr>
        <tr>Мобильный Банк</tr>
        <tr>Онлайн услуги</tr>
        <tr>Исламское Окно</tr>
      </td>
      <td>
        <thead>Юридическим лицам</thead>
        <br />
        <tr>Кредиты</tr>
        <tr>Депозиты</tr>
        <tr>Интернет-банкинг</tr>
        <tr>Тарифы</tr>
        <tr>Операции с цеными бумагами</tr>
      </td>
    </table>
  );
};

export default index;
