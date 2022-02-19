import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Forget from "./pages/AuthPage/forget";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import clients from "./pages/Clients/clients";
import departments from "./pages/Departments/departments";
import Projects from "./pages/Projects/projects";

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
          <Route path="/Departments" component={departments} />
          <Route path="/Clients" component={clients} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
