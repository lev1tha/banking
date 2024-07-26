import React from "react";
import ProfileServer from "@/procsesses/profile/";
import Header from "@/widgets/header/Header";

const page = () => {
  return (
    <div>
      <Header />
      <ProfileServer />
    </div>
  );
};

export default page;
