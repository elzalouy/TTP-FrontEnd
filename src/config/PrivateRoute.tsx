import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component, isAuthenticated}: any) => {
  return (isAuthenticated ? component : <Redirect to={{ pathname: "/" }}/>);
};

export default PrivateRoute;
