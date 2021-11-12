import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ path, Component, roles, isAuth }) => {
  const userRole = useSelector((state) => state.authentication.userRole);

  return (
    <Route
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
