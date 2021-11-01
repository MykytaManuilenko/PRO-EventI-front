import React from "react";
import { useSelector, useDispatch } from "react-redux";
import navStyle from "./UserNav.module.scss";
import { useHistory } from "react-router-dom";
import { logOutUser } from "../../../redux/actions/auth";

const UserNav = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authentication.user_id);
  const token = localStorage.getItem("accessToken");
  const history = useHistory();
  return (
    <div className={navStyle.userNavContainer}>
      <div className={navStyle.userInfo}>
        <p>{userId}</p>
        <button onClick={() => dispatch(logOutUser(token, history))}>
          <img src="./logOut.svg" alt="" className={navStyle.logOut}></img>
        </button>
      </div>
    </div>
  );
};

export default UserNav;
