import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoggedInContainer from "./layout";
import Forget from "./pages/AuthPage/forget";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import departments from "./pages/Departments/departments";
// import Departments from "./pages/Departments/departments";
import Category from "./pages/Category/Category";
// import ProjectManagers from "./pages/Project managers/ProjectManagers";
import tasks from "./pages/tasks/tasks";
// import ProjectManagers from "./pages/projectManagers/projectManagers";
import Projects from "./pages/Projects/projects";
import TasksListView from "./pages/TasksListView/TasksListView";
// import tasks from "./pages/tasks/tasks";
import ProjectManagers from "./pages/projectManagers/projectManagers";
import AllPopsPage from "./pages/AllPopsPage";

type Props = {};

const App: React.FC<Props> = () => {
  return (
    <div className="main-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/ForgetPassword" component={Forget} />
          <Route path="/RestPassword" component={RestPassword} />
          <LoggedInContainer path="/Projects" component={Projects} />
          <LoggedInContainer path="/Departments" component={departments} />
          {/* <Route path="/Projects" component={Projects} /> */}
          {/* <Route path="/Departments" component={Departments} /> */}
          <Route path="/Categories" component={Category} />
          <Route path="/ProjectManagers" component={ProjectManagers} />
          {/* <Route path="/Projects" component={Projects} /> */}
          {/* <Route path="/ProjectManagers" component={ProjectManagers} /> */}
          {/* <Route path="/Departments" component={departments} /> */}
          <Route path="/Tasks" component={tasks} />
          <LoggedInContainer path="/TasksList" component={TasksListView} />
          {/* <Route path="/Projects" component={Projects} /> */}
          {/* <Route path="/ProjectManagers" component={ProjectManagers} /> */}
          {/* <Route path="/Departments" component={departments} /> */}
          {/* <Route path="/Tasks" component={tasks} /> */}
          <Route path="/AllPopsPage" component={AllPopsPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
