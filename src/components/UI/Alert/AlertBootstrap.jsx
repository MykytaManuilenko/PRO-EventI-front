import React from "react";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import "./AlertBootstrap.scss";
import { uiActions } from "../../../redux/slices/ui";

const AlertBootstrap = (props) => {
  const dispatch = useDispatch();
  const isOpenAlert = (state) => state.UI.isOpenAlert;
  const alert = useSelector((state) => state.UI.alert);
  const isLoginPage = useRouteMatch("/login");
  const isRegisterPage = useRouteMatch("/registration");

  useEffect(() => {
    if (
      alert !== null &&
      alert.status !== "error" &&
      props.disappear &&
      isOpenAlert
    ) {
      window.setTimeout(() => {
        dispatch(uiActions.closeAlert(null));
      }, 5000);
    }
  }, [props.disappear, isOpenAlert]);
  return (
    <div
      className={
        isRegisterPage || isLoginPage ? "alertForNotLogedIn" : "alertContainer"
      }
    >
      {alert !== null && isOpenAlert ? (
        <Alert
          variant={
            alert !== null && alert.status === "error" ? "danger" : "success"
          }
          className="allertError"
          onClose={() => dispatch(uiActions.closeAlert())}
          dismissible
        >
          {alert.message}
        </Alert>
      ) : null}
    </div>
  );
};

export default AlertBootstrap;
