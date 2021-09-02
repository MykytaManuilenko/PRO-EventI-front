import React, { useState } from "react";
import NavItem from "./NavItem/NavItem";
import "./NavBar.scss";
import {Link} from 'react-router-dom'

const NavBar = (props) => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if(window.scrollY >= 69){
      setNavbar(true);
    }else{
      setNavbar(false);
    }
  }
  window.addEventListener('scroll', changeBackground);
  return (
    <nav className={"SimpleNavBar" + (navbar ? " active" : "") + (" " + props.cname)}>
      <h2 className="logo">Eventl</h2>
      <div className="items">
        <NavItem active={navbar} cname={props.cname}/>
      </div>
      <div className="rightPart">
        {/* тут должна быть локация */}
        <p className="location">
          <img src="./location.svg" alt="" className="locationI" />
          Warsaw, Poland
        </p>
        <Link to="/login">
          <button className="logButton">Log in</button>
        </Link>
        
      </div>
    </nav>
  );
};

export default NavBar;
