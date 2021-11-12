import axios from "axios";
// import axiosInstance from "../../../utils/axiosInstance";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { logOutUser } from "../../../redux/actions/auth";
import { uiActions } from "../../../redux/slices/ui";
import jwt from "jwt-decode";

const Confirmation = () => {
  const location = useLocation();
  const history = useHistory();
  const params = location.search.slice(1).split("&");

  const requestId = params[0].split("=")[1];
  const hash = params[1].split("=")[1];

  const dispatch = useDispatch();
  const authToken = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .patch(`/api/confirmations/${requestId}/registration?hash=${hash}`)
      .then(async (res) => {
        dispatch(uiActions.unsetSuccess(""));
        dispatch(logOutUser(authToken, history));
      })
      .catch((err) => console.log("err :>> ", err));
  }, []);

  return <div>HELLO</div>;
};

export default Confirmation;
