import React, { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Button from "../../UI/Button/Button";
import "./UsersPage.scss";

const UsersPage = () => {
  const [allUsers, setAllUsers] = useState();
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    axiosInstance
      .get("/api/users")
      .then((res) => {
        console.log("res :>> ", res);
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, [changed]);

  const clickHandler = (userId, status) => {
    const userStatus = status ? false : true;
    console.log("active :>> ", userStatus);
    axiosInstance
      .patch(`/api/users/${userId}/status`, { active: userStatus })
      .then((res) => {
        console.log("resStatus :>> ", res);
        setChanged(!changed);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };
  return (
    <div className="usersContainer">
      <div className="usersContentContainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.map((user) => {
                return (
                  <tr>
                    <td>{user.userId}</td>
                    <td>{user.firstName}</td>
                    <td>{user.status}</td>
                    <td>{user.role}</td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button class="deleteButton">
                        <img src="./delete.svg" alt="" />
                      </Button>
                      <Button
                        class="deactivateButton"
                        onClick={() => clickHandler(user.userId, user.status)}
                      >
                        {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
