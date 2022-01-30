import React from "react";
import "./Arrow.scss";

const Arrow = (props) => {
  return (
    <>
      <div
        className={"ArrowIcon" + (props.isOpen ? " open" : "")}
        onClick={props.onClick}
      >
        <span className={props.isAuth ? "left-bar" : "notAuthLeftBar"}></span>
        <span className={props.isAuth ? "right-bar" : "notAuthRightBar"}></span>
      </div>
    </>
  );
};

export default Arrow;
