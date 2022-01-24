import React from "react";
import { useHistory } from "react-router-dom";
import "./GoBack.scss";

const GoBack = () => {
  const history = useHistory();
  return (
    <div className="containerGoBack">
      <p className="goBack" onClick={() => history.goBack()}>
        Go Back
      </p>
    </div>
  );
};

export default GoBack;
