import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axiosInstance";
import navStyle from "./UserNav.module.scss";

const UserNav = () => {
  // const userId = useSelector((state) => state.authentication.user_id);
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
        {/* <p></p> */}
        <p>
          Hello, {userData && userData.firstName}{" "}
          {userData && userData.lastName}
        </p>
        {/* <p>Hello, {userId}</p> */}
      </div>
    </div>
  );
};

export default UserNav;
