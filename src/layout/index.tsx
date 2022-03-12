import React from "react";
import { Route } from "react-router-dom";
import Sidebar from "./partials/Sidebar";

interface Props {
  component: React.ReactNode;
  path: string;
}

const LoggedInContainer: React.FC<Props> = ({
  component: Component,
  ...rest
}: any) => {
  return (
    <>
      <Sidebar />
      <Route
        {...rest}
        render={(matchProps: any) => <Component {...matchProps} {...rest} />}
      />
    </>
  );
};

export default LoggedInContainer;
