import React from "react";
import GoBack from "../../../UI/GoBack/GoBack";
import MyBookedEventsTemplate from "./MyBookedEventsTemplate";

const MyBookedEvents = () => {
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
        <MyBookedEventsTemplate />
      </div>
    </>
  );
};

export default MyBookedEvents;
