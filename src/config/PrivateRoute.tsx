import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? component : <Redirect to={{ pathname: "/login" }} />;
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
