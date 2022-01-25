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
  console.log("requestId :>> ", requestId);
  console.log("hash :>> ", hash);

  //http://localhost:3000/confirm/registration?requestId=0f5d7f41-f820-4a67-8cdd-203c0e15dc85&hash=6152941c54d911855d19fcafd57d4c545b5c46f62bc1f4f844ecb740210151a8
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .patch(`/api/confirmations/${requestId}/registration?hash=${hash}`)
      .then(async (res) => {
        history.push("/login");
      })
      .catch((err) => console.log("err :>> ", err));
  }, []);

  return <div>HELLO</div>;
};

export default Confirmation;
