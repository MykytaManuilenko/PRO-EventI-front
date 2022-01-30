import React, { useState } from "react";
import styleNav from "./LogNavBar.module.scss";
import { NavLink, useHistory } from "react-router-dom";
import { logOutUser } from "../../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeIcon,
  HomeIconActive,
  EventIcon,
  EventIconActive,
  InfoIcon,
  HistoryIcon,
  HistoryIconActive,
  LogOutIcon,
  FriendsIcon,
} from "../../../assets/icons";

const activeStyle = {
  borderRadius: "10px 0 0 10px",
  padding: "12px",
  background: "white",
  color: "#8698e9",
  width: "100%",
  fontWeight: "600",
};

const LogNavBar = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const [isActive, setIsActive] = useState();
  const history = useHistory();
  const userRole = useSelector((state) => state.authentication.userRole);

  const onPath = (paths, index) => {
    return (match, location) => {
      if (paths.includes(location.pathname)) {
        setIsActive(true);
        return true;
      }
      // setIsActive(index);
      // return paths.includes(location.pathname);
    };
  };
  const navLinks = [
    {
      name: "My Page",
      icon: HomeIcon,
      iconActive: HomeIconActive,
      link: "/userProfile",
      // activePath: ['/userProfile']
    },
    {
      name: "Events",
      icon: EventIcon,
      iconActive: EventIconActive,
      link: "/events",
      // activePath: ['/events']
    },
    {
      name: "History",
      icon: HistoryIcon,
      iconActive: HistoryIconActive,
      link: "/history",
    },
    {
      name: "About us",
      icon: InfoIcon,
      iconActive: InfoIcon,
      link: "/about",
    },
  ];

  const adminNavLinks = [
    {
      name: "My Page",
      icon: HomeIcon,
      iconActive: HomeIconActive,
      link: "/userProfile",
    },
    {
      name: "Events",
      icon: EventIcon,
      iconActive: EventIconActive,
      link: "/events",
    },
    {
      name: "All users",
      icon: FriendsIcon,
      iconActive: FriendsIcon,
      link: "/allUsers",
    },
  ];

  return (
    <nav className={styleNav.logNav}>
      <h2 className={styleNav.logo}>Eventl</h2>

      <div className={styleNav.listOfLinks}>
        {userRole === "SYSTEM_ADMIN" ? (
          <>
            {adminNavLinks.map((navLink, index) => {
              return (
                <NavLink
                  key={index}
                  className={styleNav.navLink}
                  to={navLink.link}
                  activeStyle={activeStyle}
                  isActive={onPath(navLink.link, index)}
                >
                  {isActive === index
                    ? // isActive
                      navLink.iconActive && (
                        <navLink.iconActive className={styleNav.icons} />
                      )
                    : navLink.icon && (
                        <navLink.icon className={styleNav.icons} />
                      )}
                  {navLink.name}
                </NavLink>
              );
            })}
          </>
        ) : (
          <>
            {navLinks.map((navLink, index) => {
              return (
                <NavLink
                  key={index}
                  className={styleNav.navLink}
                  to={navLink.link}
                  activeStyle={activeStyle}
                  isActive={onPath(navLink.link, index)}
                >
                  {isActive === index
                    ? // isActive
                      navLink.iconActive && (
                        <navLink.iconActive className={styleNav.icons} />
                      )
                    : navLink.icon && (
                        <navLink.icon className={styleNav.icons} />
                      )}
                  {navLink.name}
                </NavLink>
              );
            })}
          </>
        )}
      </div>

      <button
        className={styleNav.logOutButt}
        onClick={() => dispatch(logOutUser(token, history))}
      >
        <LogOutIcon className={styleNav.icons} />
        Log Out
      </button>
    </nav>
  );
};

export default LogNavBar;
