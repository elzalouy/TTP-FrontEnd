import { Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Login,
  ResetPassword,
  Forget,
  UpdatePassword,
  OverView,
  TasksBoardView,
  TasksListView,
  Projects,
  ProjectManagers,
  Notifications,
  NotFound,
  Departments,
  Clients,
  Categories,
} from "./views";
import LoggedInContainer from "./coreUI/layout/Layout";
import { useDispatch } from "react-redux";
import { getAllClients } from "./models/Clients";
import { getPMs } from "./models/PM";
import { getAllDepartments } from "./models/Departments";
import { getAllCategories } from "./models/Categories";
import {
  getAllProjects,
  getAllTasks,
  selectAllProjects,
} from "./models/Projects";
import { ToastContainer } from "react-toastify";
import { getAllMembers } from "./models/TechMember";
import "react-toastify/dist/ReactToastify.css";
import AppHooks from "./coreUI/contexts/AppHooks";
import PopUps from "./coreUI/contexts/Modals";
import { Box } from "@mui/system";
import { getUnNotified } from "./models/Notifications";
import { useAppSelector } from "./models/hooks";
import { checkAuthToken } from "./services/api";
import { getUserInfo, selectIsAuth, selectUser } from "./models/Auth";
import {
  setStatisticsEmpty,
  setStatisticsForOm,
  setStatisticsForPm,
} from "./models/Statistics";
import "./App.css";
import "swiper/css/navigation";
import "swiper/css";
import UIComponents from "./views/UiComponents";
import SelectOptions from "./coreUI/components/Inputs/SelectFields/Options";
const App: React.FC = (props) => {
  const dispatch = useDispatch();
  const projects = useAppSelector(selectAllProjects);
  const isAuthed = useAppSelector(selectIsAuth);
  const [mounted, setMounted] = useState(false);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    let id = localStorage.getItem("id");
    if (checkAuthToken() && id) {
      dispatch(
        getUserInfo({
          id: id,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (!mounted && isAuthed) {
      dispatch(getAllDepartments(null));
      dispatch(getAllCategories(null));
      dispatch(getAllClients(null));
      dispatch(getPMs(null));
      dispatch(getAllMembers(null));
      dispatch(getAllProjects(null));
      dispatch(getAllTasks(null));
      dispatch(getUnNotified(null));
      setMounted(true);
    }
  }, [dispatch, mounted, isAuthed]);

  useEffect(() => {
    if (projects.projects.length > 0) {
      if (user?.role === "OM") {
        dispatch(
          setStatisticsForOm({
            projects: projects.projects,
            tasks: projects.allTasks,
            user: user,
          })
        );
      }
      if (user?.role === "PM") {
        dispatch(
          setStatisticsForPm({
            projects: projects.projects,
            tasks: projects.allTasks,
            user: user,
          })
        );
      }
    } else dispatch(setStatisticsEmpty(null));
  }, [projects.allTasks, projects.projects]);

  return (
    <Box marginTop={{ sm: 5, md: 5 }}>
      <AppHooks>
        <ToastContainer
          data-test-id="toastMessage"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          limit={1}
          draggable
        />
        <PopUps />
        <Switch>
          <Route key="/path" exact path="/login" component={Login} />
          <Route
            key="forgetPassword"
            path="/forgetPassword"
            component={Forget}
          />
          <Route
            key="/resetPassword"
            path="/resetPassword/:token"
            component={ResetPassword}
          />
          <Route
            key="/newPassword"
            path="/newPassword/:token"
            component={UpdatePassword}
          />
          <LoggedInContainer
            key="/projects"
            path="/Projects"
            component={Projects}
          />
          <LoggedInContainer
            path="/TasksList"
            key="tasksList"
            component={TasksListView}
          />
          <LoggedInContainer
            key="/tasksBoard"
            path="/TasksBoard/:id"
            component={TasksBoardView}
          />
          <LoggedInContainer
            key="/clients"
            path="/Clients"
            component={Clients}
          />
          <LoggedInContainer
            path="/Departments"
            key="/departments"
            component={Departments}
          />
          <LoggedInContainer
            path="/Categories"
            key="/categories"
            component={Categories}
          />
          <LoggedInContainer
            path="/ProjectManagers"
            key="/projectManagers"
            component={ProjectManagers}
          />
          <LoggedInContainer
            path="/notifications"
            key="/notifications"
            component={Notifications}
          />
          <LoggedInContainer
            path="/Overview"
            component={OverView}
            key="/overview"
          />
          {process.env.NODE_ENV === "development" && (
            <Route key="/DevComponents" path="/Dev" component={UIComponents} />
          )}
          {isAuthed && <Redirect from="/" to="/Overview" />}
          {!isAuthed && <Route path="*" component={NotFound} key="/notfound" />}
          {isAuthed && (
            <LoggedInContainer
              path="*"
              component={NotFound}
              notfound
              key="/notfound_user"
            />
          )}
        </Switch>
      </AppHooks>
    </Box>
  );
};

export default App;
