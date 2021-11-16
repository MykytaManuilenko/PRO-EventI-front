import axios from "axios";
// import axiosInstance from "../../../utils/axiosInstance";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { uiActions } from "../../../redux/slices/ui";

const Confirmation = () => {
  const location = useLocation();
  const history = useHistory();
  const params = location.search.slice(1).split("&");

  const requestId = params[0].split("=")[1];
  const hash = params[1].split("=")[1];

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .patch(`/api/confirmations/${requestId}/registration?hash=${hash}`)
      .then(async (res) => {
        dispatch(uiActions.unsetSuccessRegister());
        history.push("/login");
      })
      .catch((err) => console.log("err :>> ", err));
  }, []);

  return <div>HELLO</div>;
};

export default Confirmation;
