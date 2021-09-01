import React from "react";
import "./NavItem.scss";
import { Link } from "react-router-dom";

const NavItem = (props) => {
  return (
    <ul className={"NavItem" + (props.active ? " activeNav" : "") + (" " + props.cname)}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/allEvents">Events</Link>
      </li>
      <li>
        <Link to="/"> About us</Link>
      </li>
    </ul>
  );
};

export default NavItem;
