import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import LoggedInContainer from "./layout";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import TasksListView from "./pages/TasksListView/TasksListView";
import TasksBoardView from "./pages/TaskViewBoard/TaskViewBoard";
import departments from "./pages/Departments/departments";
import Forget from "./pages/AuthPage/forget";
import Projects from "./pages/Projects/projects";
import Category from "./pages/Category/Category";
import Clients from "./pages/Clients/clients";
import ProjectManagers from "./pages/projectManagers/projectManagers";
import NotificationContainer from "./pages/NotificationPage/NotificationContainer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./redux/hooks";
import { getAllClients } from "./redux/Clients";
import { clientsDataSelector } from "./redux/Clients/clients.selectors";
import { getPMs } from "./redux/PM";
import { getAllDepartments } from "./redux/Departments";
import { getAllCategories } from "./redux/Categories";
import { getAllProjects } from "./redux/Projects";
import { ToastContainer } from "react-toastify";
import { getAllMembers } from "./redux/techMember";
import OverView from "./pages/UserOverview/OverView";
import "react-toastify/dist/ReactToastify.css";
import PopUps from "./pages/PopUps";

const App: React.FC = (props) => {
  const dispatch = useDispatch();
  const clients = useAppSelector(clientsDataSelector);
  useEffect(() => {
    dispatch(getAllClients(null));
    dispatch(getPMs(null));
    dispatch(getAllDepartments(null));
    dispatch(getAllCategories(null));
    dispatch(getAllProjects(null));
    dispatch(getAllMembers(null));
  }, []);
  return (
    <div className="main-container">
      <ToastContainer />
      <PopUps />
      <Switch>
        <Route key="/path" exact path="/" component={Login} />
        <Route key="forgetPassword" path="/ForgetPassword" component={Forget} />
        <Route
          key="/resetPassword"
          path="/RestPassword"
          component={RestPassword}
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
          component={departments}
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
      </Switch>
    </div>
  );
};

export default App;
