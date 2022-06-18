import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import "./index.css";
import { useHistory } from "react-router";
import { Route, Redirect, useLocation } from "react-router-dom";
import Sidebar from "./partials/Sidebar";
import Bar from "./partials/TopBar/AppBar";
import { checkAuthToken } from "../services/api";
import { useDispatch } from "react-redux";
import { getUserInfo, selectIsAuth } from "../redux/Auth";
import { getAllDepartments } from "../redux/Departments";
import { getAllCategories } from "../redux/Categories";
import { getAllClients } from "../redux/Clients";
import { getPMs } from "../redux/PM";
import { getAllMembers } from "../redux/techMember";
import { getAllProjects, getAllTasks } from "../redux/Projects";
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

  return (
    <div className="main">
      <Route
        {...rest}
        render={(props) => {
          if (pathname === "/") return <Redirect to={"Overview"}/>;
          if (!checkAuthToken()) return <Redirect to={"/login"} />;
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
