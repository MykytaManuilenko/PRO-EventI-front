import React, { useState } from "react";
import styleNav from "./LogNavBar.module.scss";
import { NavLink, useHistory } from "react-router-dom";
import { logOutUser } from "../../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as PageIcon } from "../icons/homeIcon.svg";
import { ReactComponent as FiendsIcon } from "../icons/friendsIcon.svg";
import { ReactComponent as MessageIcon } from "../icons/messageIcon.svg";
import { ReactComponent as EventsIcon } from "../icons/eventIcon.svg";
import { ReactComponent as InfoIcon } from "../icons/infoIcon.svg";
import { ReactComponent as LogOutIcon } from "../icons/logOutButt.svg";
const activeStyle = {
  borderRadius: "10px 0 0 10px",
  padding: "12px",
  background: "white",
  color: "#6984FC",
  width: "100%",
  fontWeight: "500",
};

const LogNavBar = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const history = useHistory();
  const userRole = useSelector((state) => state.authentication.userRole);

  return (
    <nav className={styleNav.logNav}>
      <h2 className={styleNav.logo}>Eventl</h2>

      <div className={styleNav.listOfLinks}>
        {userRole === "SYSTEM_ADMIN" ? (
          <>
            <NavLink
              className={styleNav.navLink}
              to="/userProfile"
              activeStyle={activeStyle}
            >
              <PageIcon className={styleNav.icons} />
              My Page
            </NavLink>

            <NavLink
              to="/events"
              className={styleNav.navLink}
              activeStyle={activeStyle}
            >
              Events
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className={styleNav.navLink}
              to="/userProfile"
              activeStyle={activeStyle}
            >
              <PageIcon className={styleNav.icons} />
              My Page
            </NavLink>

            <NavLink
              className={styleNav.navLink}
              to="/friends"
              activeStyle={activeStyle}
            >
              <FiendsIcon className={styleNav.icons} />
              Friends
            </NavLink>

            <NavLink
              className={styleNav.navLink}
              to="/message"
              activeStyle={activeStyle}
            >
              <MessageIcon className={styleNav.icons} />
              Message
            </NavLink>

            <NavLink
              className={styleNav.navLink}
              to="/events"
              activeStyle={activeStyle}
            >
              <EventsIcon className={styleNav.icons} />
              Events
            </NavLink>

            <NavLink
              className={styleNav.navLink}
              to="/about"
              activeStyle={activeStyle}
            >
              <InfoIcon className={styleNav.icons} />
              About us
            </NavLink>
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
