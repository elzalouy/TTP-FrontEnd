import React from "react";
import Sidebar from "./partials/Sidebar/Sidebar";
import Bar from "./partials/TopBar/AppBar";
import AuthRedirection from "../../views/Auth/AuthRedirection/AuthRedirection";
import { checkAuthToken } from "../../services/api";
import { Route, Redirect, useLocation } from "react-router-dom";
import "./Layout.css";
import { useDispatch } from "react-redux";
import { initAppUiState } from "src/models/Ui";

interface Props {
  component: React.ReactNode;
  path: string;
  notfound?: boolean;
}

const LoggedInContainer: React.FC<Props> = ({
  component: Component,
  notfound,
  ...rest
}: any) => {
  if (!checkAuthToken()) {
    return <AuthRedirection />;
  }
  return (
    <div className="main">
      <Route
        {...rest}
        render={(props) => {
          return (
            <div key={rest.location.key} style={{ display: "flex" }}>
              {!notfound && <Sidebar {...rest} {...props} />}
              <Bar {...props} {...rest} />
              <Component key={rest?.location?.key} {...props} {...rest} />
            </div>
          );
        }}
      />
    </div>
  );
};

export default LoggedInContainer;
