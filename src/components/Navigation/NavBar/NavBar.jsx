import React, { useState, useRef, useEffect } from "react";
import NavItem from "./NavItem/NavItem";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import LocationAuto from "../../UI/LocationAuto/LocationAuto";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../redux/actions/auth";
import { useLocation } from "react-router-dom";

const NavBar = (props) => {
  const { userName, isAuthenticated } = useSelector(
    (state) => state.authentication
  );

  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(false);
  // const [cities, setCities] = useState("");
  const [locValue, setLocValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef();
  const userId = useSelector((state) => state.authentication.user_id);
  const routes = ["/login", "/allEvents", "/registration"];
  const [colour, setColour] = useState("");

  let location = useLocation();
  console.log("location :>> ", location.pathname);

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
    console.log("colour :>> ", colour);
    console.log(" LALALALALALA:>> ", routes.includes(location.pathname));
    console.log("location.typeOf() :>> ", typeof location.pathname);
    setColour("white");

    if (routes.includes(location.pathname)) {
      setColour("black");
    }
  }, [location]);

  window.addEventListener("scroll", changeBackground);
  return (
    <nav
      className={"SimpleNavBar" + (navbar ? " active" : "")}
      style={
        location.pathname === "/"
          ? { background: "none" }
          : { background: "white", borderRadius: "0 0 50px 50px" }
      }
    >
      <h2 className="logo">Eventl</h2>
      <div className="items">
        <NavItem active={navbar} colour={colour} />
      </div>
      <div className="rightPart">
        <div
          className="location"
          ref={ref}
          onClick={() => {
            setIsClicked(!isClicked);
          }}
          style={
            // routes.includes(location) ? { color: "black" } : { color: "white" }
            { color: colour }
          }
        >
          {isClicked ? (
            <LocationAuto
              locValue={locValue}
              setLocValue={setLocValue}
              setIsClicked={setIsClicked}
            />
          ) : (
            <div>
              <img src="./location.svg" alt="" className="locationI" />{" "}
              {locValue ? locValue : "Choose city"}
            </div>
          )}
        </div>
        {!isAuthenticated ? (
          <Link to="/login">
            <button className="logButton">Log in</button>
          </Link>
        ) : (
          <div>
            <Link to="/userProfile">
              <p>Profile</p>
              {/* <p>{userName}</p>  */}
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
