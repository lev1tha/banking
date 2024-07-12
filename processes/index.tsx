"use client";
import React from "react";
import axios from "axios";

// Настроить Redux и сделать четка классно ахуенно

export const [dollar, setDollar] = React.useState<any>();

export const COURSEDOLLAR =
  "http://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=02/03/2001&date_req2=14/03/2001&VAL_NM_RQ=R01235";

export const $dollarcourse = axios
  .get(COURSEDOLLAR)
  .then((req) => setDollar(req));
