import React from "react";
import "./MyLikedEvents.scss";
import GoBack from "../../../UI/GoBack/GoBack";
import MyLikedEventsTemplate from "./MyLikedEventsTemplate";

const MyLikedEvents = () => {
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
        <MyLikedEventsTemplate hideButton />
      </div>
    </>
  );
};

export default MyLikedEvents;
