import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoggedInContainer from "./layout";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import tasks from "./pages/tasks/tasks";
import TasksListView from "./pages/TasksListView/TasksListView";
import TasksBoardView from "./pages/TaskViewBoard/taskViewBoard";
import AllPopsPage from "./pages/AllPopsPage";
import departments from "./pages/Departments/departments";
import Forget from "./pages/AuthPage/forget";
import Projects from "./pages/Projects/projects";
import Departments from "./pages/Departments/departments";
import Category from "./pages/Category/Category";
import ProjectManagers from "./pages/projectManagers/ProjectManagers";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./redux/hooks";
import { getAllClients } from "./redux/Clients";
import { selectClients } from "./redux/Clients/clients.selectors";
import { getPMs } from "./redux/PM";
import { getAllDepartments } from "./redux/Departments";
import { getAllCategories } from "./redux/Categories";
import { getAllProjects } from "./redux/Projects";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllMembers } from "./redux/techMember";

type Props = {};

const App: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const clients = useAppSelector(selectClients);
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
      <BrowserRouter>
        <ToastContainer />
        <Switch>
          <Route key="/path" exact path="/" component={Login} />
          <Route
            key="forgetPassword"
            path="/ForgetPassword"
            component={Forget}
          />
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
          <Route path="/Tasks" key="/tasks" component={tasks} />
          <LoggedInContainer
            path="/projects"
            key="projects"
            component={TasksListView}
          />
          <LoggedInContainer
            key="/tasksBoard"
            path="/TasksBoard/:id"
            component={TasksBoardView}
          />
          <Route
            key="/tasksBoard"
            path="/AllPopsPage"
            component={AllPopsPage}
          />
          <LoggedInContainer
            key="/clients"
            path="/Clients"
            component={clients}
          />
          <Route
            path="/Departments"
            key="/departments"
            component={Departments}
          />
          <Route path="/Categories" key="/categories" component={Category} />
          <Route
            path="/ProjectManagers"
            key="/projectManagers"
            component={ProjectManagers}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
