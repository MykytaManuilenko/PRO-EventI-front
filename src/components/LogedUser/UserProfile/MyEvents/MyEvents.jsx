import React from "react";
import AlertBootstrap from "../../../UI/Alert/AlertBootstrap";
import GoBack from "../../../UI/GoBack/GoBack";
import MyEventsTemplate from "./MyEventsTemplate";

const MyEvents = () => {
  return (
    <>
      <GoBack />
      <AlertBootstrap disappear />
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
        <MyEventsTemplate hideButton={true} />
      </div>
    </>
  );
};

export default MyEvents;
