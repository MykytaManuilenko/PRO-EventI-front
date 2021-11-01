import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {confirmLogin} from "../../../redux/slices/auth";

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
      .then((res) => {
        history.push('/');
        dispatch(confirmLogin());

      })
      .catch((err) => console.log("err :>> ", err));
  }, []);

  return <div>HELLO</div>;
};

export default Confirmation;
