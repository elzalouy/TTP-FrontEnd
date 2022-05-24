import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import "./index.css";
import { useHistory } from "react-router";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "./partials/Sidebar";
import Bar from "./partials/TopBar/AppBar";
import { checkAuthToken } from "../services/api";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../redux/Auth";
import { getAllDepartments } from "../redux/Departments";
import { getAllCategories } from "../redux/Categories";
import { getAllClients } from "../redux/Clients";
import { getPMs } from "../redux/PM";
import { getAllMembers } from "../redux/techMember";
import { getAllProjects, getAllTasks } from "../redux/Projects";

interface Props {
  component: React.ReactNode;
  path: string;
}

const LoggedInContainer: React.FC<Props> = ({
  component: Component,
  ...rest
}: any) => {
  return (
    <div className="main">
      <Route
        {...rest}
        render={(props) => {
          if (!checkAuthToken()) return <Redirect to={"/login"} />;
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
    </div>
  );
};

export default LoggedInContainer;
