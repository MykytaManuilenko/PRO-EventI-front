import React from "react";
import "./Like.scss";

const Like = (props) => {
  return (
    <div className="inhalt">
      <svg className={`one ${props.isLiked && "on"}`} viewBox="0 0 100 100">
        <g className="heartOne" onClick={props.addFavourite}>
          <path
            className="heartEX"
            d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z"
          />
          <path
            className="heart"
            d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z"
          />
        </g>
      </svg>
    </div>
  );
};

export default Like;
