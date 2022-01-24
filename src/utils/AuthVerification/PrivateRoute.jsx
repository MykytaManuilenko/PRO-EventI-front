import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "../../redux/slices/ui";

const PrivateRoute = ({ path, Component, roles, isAuth }) => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.authentication.userRole);
  useEffect(() => {
    dispatch(uiActions.closeAlert());
  }, []);
  return (
    <Route
      exact
      path={path}
      render={() => {
        if (isAuth && roles.includes(userRole)) {
          return <Component />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
