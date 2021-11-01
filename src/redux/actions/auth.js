import axios from "axios";
import { authAction } from "../slices/auth";
import { uiActions } from "../slices/ui";
import jwt from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";
import { useHistory } from "react-router-dom";

const registrationUser = (data) => (dispatch) => {
  dispatch(uiActions.setLoading());
  axios
    .post("/api/register", data)
    .then((res) => {
      const token = jwt(res.data.accessToken);
      const merged = {
        userId: token.userId,
        role: token.role,
        firstName: data.firstName,
      };
      dispatch(authAction.registration(merged));
      dispatch(
        uiActions.setSuccess({
          status: "success",
          message: "Confirm your email :)",
        })
      );
      dispatch(uiActions.unsetError(""));
      localStorage.setItem("accessToken", res.data.accessToken);
    })
    .catch((err) => {
      dispatch(
        uiActions.setError({
          status: "error",
          message: err.response.data.message,
        })
      );
    });
};

const logInUser = (data, history) => (dispatch) => {
  // const history = useHistory();
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
      console.log("err :>> ", err);
    });
};

const logOutUser = (token, history) => (dispatch) => {
  axiosInstance
    .delete("/api/tokens/me")
    .then((res) => {
      dispatch(authAction.logOut(token));
      localStorage.removeItem("accessToken");
      history.push("/");
    })
    .catch((err) => {
      console.log("err :>> ", err);
      // console.log('localStorage :>> ', localStorage.getItem('accessToken'));
    });
};

export { registrationUser, logInUser, logOutUser };
