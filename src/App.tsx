import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoggedInContainer from "./layout";
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
import ProjectManagers from "./pages/projectManagers/projectManagers";
import NotificationContainer from "./pages/NotificationPage/NotificationContainer";
import { useDispatch } from "react-redux";
import { getAllClients } from "./redux/Clients";
import { getPMs } from "./redux/PM";
import { getAllDepartments } from "./redux/Departments";
import { getAllCategories } from "./redux/Categories";
import { getAllProjects } from "./redux/Projects";
import { ToastContainer } from "react-toastify";
import { getAllMembers } from "./redux/techMember";
import OverView from "./pages/UserOverview/OverView";
import "react-toastify/dist/ReactToastify.css";
import PopUps from "./pages/PopUps";
import { Box } from "@mui/system";
import NotFound from "./pages/NotFound";
import UpdatePassword from "./pages/AuthPage/update";

const App: React.FC = (props) => {
  const dispatch = useDispatch();
  // const clients = useAppSelector(clientsDataSelector);

  useEffect(() => {
    dispatch(getAllDepartments(null));
    dispatch(getAllCategories(null));
    dispatch(getAllClients(null));
    dispatch(getPMs(null));
    dispatch(getAllMembers(null));
  }, []);

  return (
    <Box marginTop={{ sm: 5, md: 5 }}>
      <ToastContainer />
      <PopUps />
      <Switch>
        <Route key="/path" exact path="/" component={Login} />
        <Route key="forgetPassword" path="/forgetPassword" component={Forget} />
        <Route
          key="/resetPassword"
          path="/resetPassword"
          component={ResetPassword}
        />
        <Route
          key="/newPassword"
          path="/newPassword"
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
        <LoggedInContainer key="/clients" path="/Clients" component={Clients} />
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
        <LoggedInContainer path="/404" component={NotFound} key="/notfound" />
        <Redirect from="*" to="/404" key="404" />
      </Switch>
    </Box>
  );
};

export default App;
