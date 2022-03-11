import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoggedInContainer from "./layout";
import Forget from "./pages/AuthPage/forget";
import Login from "./pages/AuthPage/login";
import RestPassword from "./pages/AuthPage/rest";
import departments from "./pages/Departments/departments";
import tasks from "./pages/tasks/tasks";
// import ProjectManagers from "./pages/projectManagers/projectManagers";
import AllPopsPage from "./pages/AllPopsPage";
import Projects from "./pages/Projects/projects";
import taskViewBoard from "./pages/TaskViewBoard/taskViewBoard";
// import Forget from "./pages/AuthPage/forget";
// import Projects from "./pages/Projects/projects";
import Departments from "./pages/Departments/departments";
import Category from "./pages/Category/Category";
import ProjectManagers from "./pages/Project managers/ProjectManagers";
// import Projects from "./pages/Projects/projects";
import TasksListView from "./pages/TasksListView/TasksListView";

type Props = {};

const App: React.FC<Props> = () => {
  return (
    <div className="main-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/ForgetPassword" component={Forget} />
          <Route path="/RestPassword" component={RestPassword} />
          {/* <Route path="/Projects" component={Projects} /> */}
          {/* <Route path="/ProjectManagers" component={ProjectManagers} /> */}
          {/* <Route path="/Departments" component={departments} /> */}
          <Route path="/Tasks" component={tasks} />
          <Route path="/AllPopsPage" component={AllPopsPage} />
          <LoggedInContainer path="/Projects" component={Projects} />
          <LoggedInContainer path="/Departments" component={departments} />
          <LoggedInContainer path="/taskViewBoard" component={taskViewBoard} />
          {/* <LoggedInContainer path="/clients" component={clients} /> */}
          <LoggedInContainer
            path="/projectManagers"
            component={ProjectManagers}
          />
          <LoggedInContainer path="/Tasks" component={TasksListView} />
        </Switch>  
      </BrowserRouter>
    </div>
  );
};

export default App;









