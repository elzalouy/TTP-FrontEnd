import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import Forget from "./pages/AuthPage/forget";
import Projects from "./pages/Projects/projects";
import departments from "./pages/Departments/departments";
import tasks from "./pages/tasks/tasks";
import ProjectManagers from "./pages/projectManagers/projectManagers";

type Props = {};

const App: React.FC<Props> = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/ForgetPassword" component={Forget} />
          <Route path="/RestPassword" component={RestPassword} />
          <Route path="/Projects" component={Projects} />
          <Route path="/ProjectManagers" component={ProjectManagers} />
          <Route path="/Departments" component={departments} />
          <Route path="/Tasks" component={tasks} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
