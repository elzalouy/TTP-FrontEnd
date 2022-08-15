import "./App.css";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoggedInContainer from "./coreUI/layout/Layout";
import Login from "./pages/AuthPage/login";
import ResetPassword from "./pages/AuthPage/reset";
import TasksListView from "./pages/TasksListView/TasksListView";
import TasksBoardView from "./pages/TaskViewBoard/Board/TaskViewBoard";
import Departments from "./pages/Departments/Departments/Departments";
import Forget from "./pages/AuthPage/forget";
import Projects from "./pages/Projects/projects";
import Category from "./pages/Category/Category";
import Clients from "./pages/Clients/clients";
import ProjectManagers from "./pages/projectManagers/PM";
import NotificationContainer from "./pages/NotificationPage/NotificationContainer";
import { useDispatch } from "react-redux";
import { getAllClients } from "./redux/Clients";
import { getPMs } from "./redux/PM";
import { getAllDepartments } from "./redux/Departments";
import { getAllCategories } from "./redux/Categories";
import {
  getAllProjects,
  getAllTasks,
  selectAllProjects,
} from "./redux/Projects";
import { ToastContainer } from "react-toastify";
import { getAllMembers } from "./redux/TechMember";
import OverView from "./pages/UserOverview/OverView";
import "react-toastify/dist/ReactToastify.css";
import AppHooks from "./coreUI/contexts/AppHooks";
import PopUps from "./coreUI/contexts/Modals";
import NotFound from "./pages/NotFound/NotFound";
import UpdatePassword from "./pages/AuthPage/update";
import { Box } from "@mui/system";
import { getUnNotified } from "./redux/Notification";
import { useAppSelector } from "./redux/hooks";
import { checkAuthToken } from "./services/api";
import { getUserInfo, selectIsAuth, selectUser } from "./redux/Auth";
import { setStatisticsForOm, setStatisticsForPm } from "./redux/Statistics";
import "swiper/css/navigation";
import "swiper/css";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const projects = useAppSelector(selectAllProjects);
  const isAuthed = useAppSelector(selectIsAuth);
  const [mounted, setMounted] = useState(false);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    let id = localStorage.getItem("id");
    if (checkAuthToken() && id) {
      console.log("user id", id);
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
    setMounted(false);
  }, [isAuthed]);
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
    }
  }, [projects.allTasks, projects.projects]);

  return (
    <Box marginTop={{ sm: 5, md: 5 }}>
      <AppHooks>
        <ToastContainer
          data-test="toastMessage"
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
            component={Category}
          />
          <LoggedInContainer
            path="/ProjectManagers"
            key="/projectManagers"
            component={ProjectManagers}
          />
          <LoggedInContainer
            path="/notifications"
            key="/notifications"
            component={NotificationContainer}
          />
          <LoggedInContainer
            path="/Overview"
            component={OverView}
            key="/overview"
          />
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
