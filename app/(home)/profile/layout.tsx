"use client";
import React from "react";
import Header from "@/widgets/header/Header";
import Footer from "@/widgets/footer";
import LayoutProfile from "@/widgets/layout/Layout";

import style from "@/shared/styles/layout.module.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={style.layoutContainer}>
        <LayoutProfile />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
