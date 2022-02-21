import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoggedInContainer from "./layout";
import Forget from "./pages/AuthPage/forget";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import clients from "./pages/Clients/clients";
import departments from "./pages/Departments/departments";
import projectManagers from "./pages/ProjectManagers/projectManagers";
import Projects from "./pages/Projects/projects";

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
          <LoggedInContainer path="/Clients" component={clients} />
          <LoggedInContainer
            path="/ProjectManagers"
            component={projectManagers}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
