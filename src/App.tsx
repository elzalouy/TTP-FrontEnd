import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import LoggedInContainer from "./layout/Layout";
import Login from "./pages/AuthPage/login";
import ResetPassword from "./pages/AuthPage/reset";
import TasksListView from "./pages/TasksListView/TasksListView";
import TasksBoardView from "./pages/TaskViewBoard/TaskViewBoard";
// import AllPopsPage from "./pages/AllPopsPage";
import Departments from "./pages/Departments/departments";
import Forget from "./pages/AuthPage/forget";
import Projects from "./pages/Projects/projects";
import Category from "./pages/Category/Category";
import Clients from "./pages/Clients/clients";
import ProjectManagers from "./pages/projectManagers/PM";
import NotificationContainer from "./pages/NotificationPage/NotificationContainer";
import { useDispatch } from "react-redux";
import { getAllClients } from "./redux/Clients";
import { getPMs, PMsActions } from "./redux/PM";
import { getAllDepartments } from "./redux/Departments";
import { getAllCategories } from "./redux/Categories";
import {
  getAllProjects,
  getAllTasks,
  selectAllProjects,
} from "./redux/Projects";
import { ToastContainer } from "react-toastify";
import { getAllMembers } from "./redux/techMember";
import OverView from "./pages/UserOverview/OverView";
import "react-toastify/dist/ReactToastify.css";
import PopUps from "./coreUI/usable-component/Popup/PopUps";
import { Box } from "@mui/system";
import NotFound from "./pages/NotFound/NotFound";
import UpdatePassword from "./pages/AuthPage/update";
import { useAppSelector } from "./redux/hooks";
import { getUserInfo, logout, selectIsAuth, selectUser } from "./redux/Auth";
import { setStatisticsForOm, setStatisticsForPm } from "./redux/Statistics";
import AppHooks from "./utils/AppHooks";
import { checkAuthToken } from "./services/api";
import "swiper/css";
import "swiper/css/navigation";

const App: React.FC = (props) => {
  const dispatch = useDispatch();
  const projects = useAppSelector(selectAllProjects);
  const isAuthed = useAppSelector(selectIsAuth);
  const [mounted, setMounted] = useState(false);
  const user = useAppSelector(selectUser);
  // const logOut = useAppSelector(selectIsLogout);

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
    if (!mounted && checkAuthToken()) {
      dispatch(getAllDepartments(null));
      dispatch(getAllCategories(null));
      dispatch(getAllClients(null));
      dispatch(getPMs(null));
      dispatch(getAllMembers(null));
      dispatch(getAllProjects(null));
      dispatch(getAllTasks(null));
      setMounted(true);
    }
  }, [dispatch, isAuthed]);

  useEffect(() => {
    console.log("update statistic hook fired");
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
  }, [projects.allTasks, projects.projects, user]);

  return (
    <Box marginTop={{ sm: 5, md: 5 }}>
      <AppHooks>
        <ToastContainer
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
