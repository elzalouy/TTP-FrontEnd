import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import Forget from "./pages/AuthPage/forget";
import Projects from "./pages/Projects/projects";
import Departments from "./pages/Departments/departments";
import Category from "./pages/Category/Category";
import ProjectManagers from "./pages/Project managers/ProjectManagers";

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
          <Route path="/Departments" component={Departments} />
          <Route path="/Categories" component={Category} />
          <Route path="/ProjectManagers" component={ProjectManagers} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
