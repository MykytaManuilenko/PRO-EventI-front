import axios from "axios";
import { authAction } from "../slices/auth";
import { uiActions } from "../slices/ui";
import jwt from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";

const registrationUser = (data) => (dispatch) => {
  axios
    .post("/api/register", data)
    .then((res) => {
      dispatch(
        uiActions.openAlert({
          status: "success",
          message: "Please confirm your email :)",
        })
      );
    })
    .catch((err) => {
      dispatch(
        uiActions.openAlert({
          status: "error",
          message: err.response.data.message,
        })
      );
    });
};

const logInUser = (data, history) => (dispatch) => {
  axiosInstance
    .post("/api/tokens/credentials", data)
    .then((res) => {
      const token = jwt(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      const merged = { userId: token.userId, role: token.role };
      dispatch(authAction.login(merged));
      history.push("/userProfile");
    })
    .catch((err) => {
      dispatch(
        uiActions.openAlert({
          status: "error",
          message: err.response.data.message,
        })
      );
    });
};

const logOutUser = (token, history) => (dispatch) => {
  axiosInstance
    .delete("/api/tokens/me")
    .then((res) => {
      dispatch(authAction.logOut(token));
      localStorage.removeItem("accessToken");
      history.push("/login");
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
};

export { registrationUser, logInUser, logOutUser };
