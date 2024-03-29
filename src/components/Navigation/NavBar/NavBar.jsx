import React, { useState, useRef, useEffect } from "react";
import NavItem from "./NavItem/NavItem";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../redux/actions/auth";
import { useLocation } from "react-router-dom";

const NavBar = (props) => {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(false);
  const [locValue, setLocValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef();
  const routes = [
    "/login",
    "/allEvents",
    "/registration",
    "/forgotPassword",
    "/confirm/password",
  ];
  const [colour, setColour] = useState("");

  let location = useLocation();

  const logOut = (token) => {
    dispatch(logOutUser(token));
  };

  const changeBackground = () => {
    if (window.scrollY >= 69) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (isClicked && ref.current && !ref.current.contains(e.target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", outsideClickHandler);

    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [isClicked]);

  useEffect(() => {
    setColour("white");
    if (routes.includes(location.pathname)) {
      setColour("black");
    }
  }, [location]);

  window.addEventListener("scroll", changeBackground);
  return (
    <nav
      className={"SimpleNavBar" + (navbar ? " activeNav" : "")}
      style={
        location.pathname === "/"
          ? { background: "none" }
          : { background: "white", borderRadius: "0 0 50px 50px" }
      }
    >
      <Link to="/">
        <h2 className="logo">Eventl</h2>
      </Link>

      <div className="items">
        <NavItem active={navbar} colour={colour} />
      </div>
      <div className="rightPart">
        {!isAuthenticated ? (
          <Link to="/login">
            <button className="logButton">Log in</button>
          </Link>
        ) : (
          <div>
            <Link to="/userProfile">
              <p>Profile</p>
            </Link>
            <button onClick={() => logOut(localStorage.getItem("accessToken"))}>
              Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
