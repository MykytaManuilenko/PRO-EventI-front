import React from "react";
import "./NavItem.scss";
import { Link } from "react-router-dom";

const NavItem = (props) => {
  console.log("props.colour :>> ", props.colour);
  return (
    <ul className={"NavItem" + (props.active ? " activeNavItem" : "")}>
      <li>
        <Link to="/" style={{ color: props.colour }}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/allEvents" style={{ color: props.colour }}>
          Events
        </Link>
      </li>
      <li>
        <Link to="/" style={{ color: props.colour }}>
          {" "}
          About us
        </Link>
      </li>
    </ul>
  );
};

export default NavItem;
