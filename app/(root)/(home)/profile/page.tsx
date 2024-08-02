"use client";
import React from "react";
import ProfileServer from "@/procsesses/profile/";
import Header from "@/widgets/header/Header";
import Layout from "@/widgets/layout/Layout";
import style from "@/shared/styles/profile.module.css";

const page = (childe: React.ReactNode) => {
  const windowChecker = window.location.pathname;

  console.log(windowChecker);
  return (
    <>
      <ProfileServer />
    </>
  );
};

export default page;
