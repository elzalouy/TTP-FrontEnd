import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoggedInContainer from "./layout";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import tasks from "./pages/tasks/tasks";
import TasksListView from "./pages/TasksListView/TasksListView";
// import tasks from "./pages/tasks/tasks";
import AllPopsPage from "./pages/AllPopsPage";
import clients from "./pages/Clients/clients";
import departments from "./pages/Departments/departments";
import Forget from "./pages/AuthPage/forget";
import Projects from "./pages/Projects/projects";
import Departments from "./pages/Departments/departments";
import Category from "./pages/Category/Category";
import ProjectManagers from "./pages/Project managers/ProjectManagers";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getAllClients } from "./store/Clients";
import { useDispatch } from "react-redux";
import { selectClients } from "./store/Clients/clients.selectors";
import { getPMs } from "./store/PM";
import { getAllDepartments } from "./store/Departments";
import { getAllCategories } from "./store/Categories/categories.actions";

type Props = {};

const App: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const clients = useAppSelector(selectClients);
  useEffect(() => {
    dispatch(getAllClients(null));
    dispatch(getPMs(null));
    dispatch(getAllDepartments(null));
    dispatch(getAllCategories(null));
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









