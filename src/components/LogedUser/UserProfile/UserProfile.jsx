import React, { useEffect, useState } from "react";
import LogNavBar from "../../Navigation/LogNavBar/LogNavBar";
import styleProf from "./UserProfile.module.scss";
import axiosInstance from "../../../utils/axiosInstance";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("accessToken");
    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
    <div className={styleProf.profileCont}>
      <div className={styleProf.infoCont}>
        <h1>User Profile</h1>
        {/* <div>
          <p>{userInfo.userId}</p>
          <p>
            {userInfo.firstName} {userInfo.lastName}
          </p>
          <p>email: {userInfo.email}</p>
        </div> */}
      </div>
    </div>
  );
};

export default UserProfile;
