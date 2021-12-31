import React from "react";
import "./Arrow.scss";

const Arrow = (props) => {
  return (
    <>
      <div className={"ArrowIcon" + (props.isOpen ? " open" : "")}>
        <span className="left-bar"></span>
        <span className="right-bar"></span>
      </div>
    </>
  );
};

export default Arrow;
