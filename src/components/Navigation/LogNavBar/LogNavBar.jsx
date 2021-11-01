import React from "react";
import styleNav from "./LogNavBar.module.scss";
import { Link } from "react-router-dom";

const LogNavBar = () => {
  return (
    <nav className={styleNav.logNav}>
      <h2 className="logo">Eventl</h2>
      <ul>
        <li>
          <Link to="/userProfile">My page</Link>
        </li>
        <li>Friends</li>
        <li>Message</li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>About us</li>
      </ul>
    </nav>
  );
};

export default LogNavBar;
