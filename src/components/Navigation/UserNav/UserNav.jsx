import React from "react";
import { useSelector } from "react-redux";
import navStyle from "./UserNav.module.scss";

const UserNav = () => {
  const userId = useSelector((state) => state.authentication.user_id);

  return (
    <div className={navStyle.userNavContainer}>
      <div className={navStyle.userInfo}>
        <p>Hello, {userId}</p>
      </div>
    </div>
  );
};

export default UserNav;
