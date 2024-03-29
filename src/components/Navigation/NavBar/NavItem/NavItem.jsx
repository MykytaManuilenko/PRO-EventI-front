import React from "react";
import "./NavItem.scss";
import { Link } from "react-router-dom";

const NavItem = (props) => {
  return (
    <ul className={"NavItem" + (props.active ? " activeNavItem" : "")}>
      {/* <li>
        <Link to="/" style={{ color: props.colour }}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/login" style={{ color: props.colour }}>
          Events
        </Link>
      </li> */}
    </ul>
  );
};

export default NavItem;
