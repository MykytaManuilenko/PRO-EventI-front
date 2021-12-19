import React from "react";
import { useHistory } from "react-router-dom";

const GoBack = () => {
  const history = useHistory();
  return (
    <div
      className="containerGoBack"
      style={{ position: "absolute", top: "-58px", left: "50px" }}
    >
      <p
        className="goBack"
        onClick={() => history.goBack()}
        style={{
          cursor: "pointer",
          color: "#ff6a7c",
          fontSize: "16px",
          margin: "0",
        }}
      >
        Go Back
      </p>
    </div>
  );
};

export default GoBack;
