import React, { useEffect, useState } from "react";
import styleProf from "./UserProfile.module.scss";
import axiosInstance from "../../../utils/axiosInstance";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        setUserInfo(res.data);
        console.log("res.data :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
    <div className={styleProf.profileCont}>
      <div className={styleProf.userInfoContainer}>
        <div className={styleProf.registerDate}>Registered from 10.11.2021</div>
        <div className={styleProf.userData}>
          <p>
            {userInfo.firstName} {userInfo.lastName}
          </p>
        </div>
        <div className={styleProf.buttContainer}>
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
