import React from "react";
import ProfileServer from "@/procsesses/profile/";
import Header from "@/widgets/header/Header";
import Layout from "@/widgets/layout/Layout";
import style from "@/shared/styles/profile.module.css";

const page = () => {
  return (
    <>
      <Header />
      <div className={style.container_profile}>
        <Layout />
        <ProfileServer />
      </div>
    </>
  );
};

export default page;
