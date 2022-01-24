import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import navStyle from "./UserNav.module.scss";

const UserNav = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        console.log("NAVBAR res :>> ", res);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
    <div className={navStyle.userNavContainer}>
      <div className={navStyle.userInfo}>
        <p>
          Hello, {userData && userData.firstName}{" "}
          {userData && userData.lastName}
        </p>
        <img
          alt="userAvatar"
          src={userData && userData.avatarUrl}
          className={navStyle.userAvatar}
        ></img>
      </div>
    </div>
  );
};

export default UserNav;
