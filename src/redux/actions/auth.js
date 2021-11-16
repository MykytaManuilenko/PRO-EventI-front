import axios from "axios";
import { authAction } from "../slices/auth";
import { uiActions } from "../slices/ui";
import jwt from "jwt-decode";
import axiosInstance from "../../utils/axiosInstance";

const registrationUser = (data) => (dispatch) => {
  dispatch(uiActions.setLoading());
  axios
    .post("/api/register", data)
    .then((res) => {
      dispatch(
        uiActions.setSuccessRegister({
          status: "success",
          message: "Confirm your email :)",
        })
      );
      dispatch(uiActions.unsetErrorRegister());
    })
    .catch((err) => {
      dispatch(uiActions.unsetSuccessRegister());
      dispatch(
        uiActions.setErrorRegister({
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
      dispatch(uiActions.unsetErrorLogIn(""));
    })
    .catch((err) => {
      console.log("err :>> ", err);
      console.log("errrr :>> ", err.response.data);
      dispatch(
        uiActions.setErrorLogIn({
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
