import { configureStore } from "@reduxjs/toolkit";
import slisecurrensies from "./currencies";

const Currencies = configureStore({
  reducer: {
    currencies: slisecurrensies,
  },
});
