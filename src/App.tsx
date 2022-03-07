import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoggedInContainer from "./layout";
import Forget from "./pages/AuthPage/forget";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import Clients from "./pages/Clients/Clients";
import departments from "./pages/Departments/departments";
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
          <LoggedInContainer path="/Clients" component={Clients} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
