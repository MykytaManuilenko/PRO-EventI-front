import React from "react";
import "./NavItem.scss";

const NavItem = (props) => {
  return (
    <ul className={"NavItem" + (props.active ? " activeNav" : "") + (" " + props.cname)}>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/">Events</a>
      </li>
      <li>
        <a href="/"> About us</a>
      </li>
    </ul>
  );
};

export default NavItem;
