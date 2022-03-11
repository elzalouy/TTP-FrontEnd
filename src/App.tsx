import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import Forget from "./pages/AuthPage/forget";
import Projects from "./pages/Projects/projects";
import LoggedInContainer from "./layout";
import departments from "./pages/Departments/departments";
// import Departments from "./pages/Departments/departments";
import Category from "./pages/Category/Category";
import ProjectManagers from "./pages/Project managers/ProjectManagers";
import tasks from "./pages/tasks/tasks";
// import ProjectManagers from "./pages/projectManagers/projectManagers";

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
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
