import React from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../../utils/axiosInstance";
import { uiActions } from "../../../../redux/slices/ui";

const ConfirmPostpone = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = location.search.slice(1).split("&");

  const hash = params[1].split("=")[1];
  const requestId = params[0].split("=")[1];
  console.log("hash :>> ", hash);
  console.log("requestId :>> ", requestId);
  //http://localhost:3000/confirm/eventPostpone?requestId=7211709c-2ce6-479d-96fe-8ff5a2caf6b3&hash=843d83e68c3f56ddfbb908facc8b485c9116e4bcab099f06a6885a67e44569ff

  useEffect(() => {
    axiosInstance
      .patch(`/api/confirmations/${requestId}/event/postpone?hash=${hash}`)
      .then((res) => {
        console.log("resConfirm postpone :>> ", res);
        dispatch(
          uiActions.openAlert({
            status: "success",
            message: "Event is successfully created!",
          })
        );
        history.push("/userProfile");
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);
  return <div>Event is successfully postponed!</div>;
};

export default ConfirmPostpone;
