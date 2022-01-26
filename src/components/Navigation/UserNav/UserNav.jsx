import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import navStyle from "./UserNav.module.scss";
import defaultAvatar from "../../../assets/purpleAvatar.png";

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
        {userData && userData.role !== "SYSTEM_ADMIN" && (
          <div
            style={
              userData
                ? userData.avatarUrl === null
                  ? {
                      background: `center / cover no-repeat url(${defaultAvatar}) `,
                      border: "3px solid #8698e9",
                      width: "53px",
                      height: "50px",
                      borderRadius: "133px",
                    }
                  : {
                      background: `center / cover no-repeat url(${userData.avatarUrl}) `,
                      border: "3px solid #8698e9",
                      width: "53px",
                      height: "50px",
                      borderRadius: "133px",
                    }
                : ""
            }
          />
        )}
      </div>
    </div>
  );
};

export default UserNav;
