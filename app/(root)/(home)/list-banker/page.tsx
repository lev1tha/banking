"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { $api, $token } from "@/shared/lib/api/api";
import Header from "@/widgets/header/Header";
import style from "@/shared/styles/list.module.css";

interface Banker {
  id: number;
  username: string;
  position: string;
  email: string;
}

const Index: React.FC = () => {
  const [bankers, setBankers] = useState<Banker[]>([]);

  useEffect(() => {
    $api
      .get("bankers", {
        headers: {
          Authorization: `Token ${$token}`,
        },
      })
      .then((response) => setBankers(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Header />
      <div className={style.container}>
        {bankers.map((banker) => (
          <div key={banker.id} className={style.card_banker}>
            <h3>{banker.username}</h3>
            <p>{banker.position}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
