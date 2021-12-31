import React from "react";
import GoBack from "../../../UI/GoBack/GoBack";
import MyEventsTemplate from "./MyEventsTemplate";

const MyEvents = () => {
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
        <MyEventsTemplate></MyEventsTemplate>
      </div>
    </>
  );
};

export default MyEvents;
