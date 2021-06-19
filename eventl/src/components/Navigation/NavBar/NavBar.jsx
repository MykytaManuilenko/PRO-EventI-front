import React from "react";
import NavItem from "./NavItem/NavItem";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="SimpleNavBar">
      <h2 className="logo">Eventl</h2>
      <div className="items">
        <NavItem />
      </div>
      <div className="rightPart">
        {/* тут должна быть локация */}
        <p className="location">
          <img src="./location.svg" alt="" className="locationI" />
          Warsaw, Poland
        </p>
        <button className="logButton">Log in</button>
      </div>
    </nav>
  );
};

export default NavBar;
