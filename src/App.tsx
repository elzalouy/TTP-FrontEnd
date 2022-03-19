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
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getAllClients } from "./redux/Clients";
import { selectClients } from "./redux/Clients/clients.selectors";
import { getPMs } from "./redux/PM";
import { getAllDepartments } from "./redux/Departments";
import { getAllCategories } from "./redux/Categories";
import { getAllProjects } from "./redux/Projects";

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
  }, []);
  return (
    <div className="main-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/ForgetPassword" component={Forget} />
          <Route path="/RestPassword" component={RestPassword} />
          <LoggedInContainer path="/Projects" component={Projects} />
          <Route path="/Tasks" component={tasks} />
          <LoggedInContainer path="/TasksList" component={TasksListView} />
          <LoggedInContainer path="/TasksBoard" component={TasksBoardView} />
          <Route path="/AllPopsPage" component={AllPopsPage} />
          <LoggedInContainer path="/Clients" component={clients} />
          <Route path="/Departments" component={Departments} />
          <Route path="/Categories" component={Category} />
          <Route path="/ProjectManagers" component={ProjectManagers} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
