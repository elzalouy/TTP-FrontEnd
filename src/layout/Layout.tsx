// import { CssBaseline } from "@mui/material";
// import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./Layout.css";
// import { useHistory } from "react-router";
import { Route, Redirect, useLocation } from "react-router-dom";
import Sidebar from "./partials/Sidebar/Sidebar";
import Bar from "./partials/TopBar/AppBar";
import { checkAuthToken } from "../services/api";
// import { useDispatch } from "react-redux";
// import { getUserInfo, selectIsAuth, selectIsLogout } from "../redux/Auth";
// import { getAllDepartments } from "../redux/Departments";
// import { getAllCategories } from "../redux/Categories";
// import { getAllClients } from "../redux/Clients";
// import { getPMs } from "../redux/PM";
// import { getAllMembers } from "../redux/techMember";
// import { getAllProjects, getAllTasks } from "../redux/Projects";
// import { useAppSelector } from "../redux/hooks";
import AuthRedirection from "../pages/AuthPage/AuthRedirection/AuthRedirection";
import { selectIsAuth, selectIsLogout } from "../redux/Auth";
import { useAppSelector } from "../redux/hooks";

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
  const { pathname } = useLocation();
  const isAuthed = useAppSelector(selectIsAuth);
  const isLogout = useAppSelector(selectIsLogout);

  if (isLogout) {
    return <AuthRedirection />;
  }

  return (
    <div className="main">
      <Route
        {...rest}
        render={(props) => {
          if (!isLogout && !isAuthed) return <Redirect to="login" />;
          if (pathname === "/") return <Redirect to={"Overview"} />;
          else
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
