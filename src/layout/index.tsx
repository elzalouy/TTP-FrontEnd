import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./partials/Sidebar";
import Bar from "./partials/TopBar/AppBar";
import { useAppSelector } from "../redux/hooks";
import { selectIsAuth } from "../redux/Auth";
import { checkAuthToken } from "../services/api";

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
        render={(props) => {
          if (checkAuthToken()) return <Redirect to={"/"} />;
          else
            return (
              <div key={rest.location.key} style={{ display: "flex" }}>
                <Sidebar {...rest} {...props} />
                <Bar {...props} {...rest} />
                <Component key={rest?.location?.key} {...props} {...rest} />
              </div>
            );
        }}
      />
    </>
  );
};

export default LoggedInContainer;
