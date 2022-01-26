import React, { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import "./UsersPage.scss";
import { Form } from "react-bootstrap";
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
    const userStatus = status === "ACTIVE" ? false : true;
    console.log("active :>> ", status);
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
        <p className="headerText">All Users</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Status</th>
              <th>Role</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td style={{ width: "20%" }}>{user.userId}</td>
                    <td>{user.firstName}</td>
                    <td>{user.status}</td>
                    <td>{user.role}</td>
                    <td>
                      <Form.Check
                        className="switch"
                        type="switch"
                        id="custom-switch"
                        checked={user.status === "ACTIVE" ? true : false}
                        onChange={() => clickHandler(user.userId, user.status)}
                      />
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
