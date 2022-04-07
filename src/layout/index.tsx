import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
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
      <Route
        {...rest}
        render={(props) => (
          <>
            <Sidebar {...rest} {...props} />
            <Component key={rest?.location?.key} {...props} {...rest} />
          </>
        )}
      />
    </>
  );
};

export default LoggedInContainer;
