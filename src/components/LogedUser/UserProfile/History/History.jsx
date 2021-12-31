import React from "react";
import { useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import GoBack from "../../../UI/GoBack/GoBack";
import HistoryTemplate from "./HistoryTemplate";

const History = () => {
  useEffect(() => {
    axiosInstance
      .get("/api/events/my/history")
      .then((res) => console.log("res :>> ", res))
      .catch((err) => console.log("err :>> ", err));
  });
  return (
    <>
      <GoBack />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          gap: "20px",
          width: "90%",
          margin: "auto",
        }}
      >
        <HistoryTemplate />
      </div>
    </>
  );
};

export default History;
