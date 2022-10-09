import * as React from "react";
import { Redirect, Route } from "react-router";
import MenuContainer from "src/coreUI/layout/BarContainer";
import { isAuthedUser, isPM } from "src/services/api";
import {
  Categories,
  Clients,
  Departments,
  Forget,
  Login,
  NotFound,
  Notifications,
  OverView,
  Managers,
  Projects,
  ResetPassword,
  TasksBoardView,
  TasksListView,
  UpdatePassword,
} from "src/views";
import AuthRedirection from "src/views/Auth/AuthRedirection/AuthRedirection";
interface RoutesProps {
  children?: any;
}

const Routes = (props: RoutesProps) => {
  const [routes] = React.useState([
    {
      routeName: "/Overview",
      Route: (
        <Route
          path="/Overview"
          key="/Overview"
          render={(props) => {
            if (isAuthedUser())
              return (
                <MenuContainer {...props}>
                  <OverView {...props} />
                </MenuContainer>
              );
            else return <Redirect to="notAuthed" />;
          }}
        />
      ),
    },
    {
      routeName: "/notAuthed",
      Route: (
        <Route
          key="/notAuthed"
          path="/notAuthed"
          // component={AuthRedirection}
          render={(props) => {
            if (isAuthedUser()) return <Redirect to="/Overview" />;
            else return <AuthRedirection {...props} />;
          }}
        />
      ),
    },
    {
      routeName: "/login",
      Route: (
        <Route
          key="/path"
          exact
          path="/login"
          render={(props) => {
            if (isAuthedUser()) return <Redirect to="/Overview" />;
            else return <Login {...props} />;
          }}
        />
      ),
    },
    {
      routeName: "/forgotPassword",
      Route: (
        <Route
          key="forgetPassword"
          path="/forgetPassword"
          render={(props) => {
            if (isAuthedUser()) return <Redirect to="/Overview" />;
            else return <Forget {...props} />;
          }}
        />
      ),
    },
    {
      routeName: "/resetPassword",
      Route: (
        <Route
          key="/resetPassword"
          path="/resetPassword/:token"
          // component={ResetPassword}
          render={(props) => {
            if (isAuthedUser()) return <Redirect to="/Overview" />;
            else return <ResetPassword {...props} />;
          }}
        />
      ),
    },
    {
      routeName: "/newPassword",
      Route: (
        <Route
          key="/newPassword"
          path="/newPassword/:token"
          component={UpdatePassword}
          render={(props) => {
            if (isAuthedUser()) return <Redirect to="/Overview" />;
            else return <UpdatePassword {...props} />;
          }}
        />
      ),
    },
    {
      routeName: "/projects",
      Route: (
        <Route
          key="/projects"
          path="/projects"
          render={(props) => {
            if (isAuthedUser())
              return (
                <MenuContainer {...props}>
                  <Projects {...props} />
                </MenuContainer>
              );
            else return <Redirect to="notAuthed" />;
          }}
        />
      ),
    },
    {
      routeName: "/TasksList",
      Route: (
        <Route
          path="/TasksList"
          key="/TasksList"
          render={(props) => {
            if (isAuthedUser())
              return (
                <MenuContainer {...props}>
                  <TasksListView {...props} />
                </MenuContainer>
              );
            else return <Redirect to="notAuthed" />;
          }}
        />
      ),
    },
    {
      routeName: "/TasksList",
      Route: (
        <Route
          key="/TasksBoard"
          path="/TasksBoard/:id"
          render={(props) => {
            if (isAuthedUser())
              return (
                <MenuContainer {...props}>
                  <TasksBoardView {...props} />
                </MenuContainer>
              );
            else return <Redirect to="notAuthed" />;
          }}
        />
      ),
    },
    {
      routeName: "/clients",
      Route: (
        <Route
          key="/clients"
          path="/Clients"
          render={(props) => {
            if (isAuthedUser() && !isPM())
              return (
                <MenuContainer {...props}>
                  <Clients {...props} />
                </MenuContainer>
              );
            else return <Redirect to="notAuthed" />;
          }}
        />
      ),
    },
    {
      routeName: "/departments",
      Route: (
        <Route
          key="/Departments"
          path="/Departments"
          render={(props) => {
            if (isAuthedUser() && !isPM())
              return (
                <MenuContainer {...props}>
                  <Departments {...props} />
                </MenuContainer>
              );
            else return <Redirect to="notAuthed" />;
          }}
        />
      ),
    },
    {
      routeName: "/Categories",
      Route: (
        <Route
          path="/Categories"
          key="/categories"
          render={(props) => {
            if (isAuthedUser() && !isPM())
              return (
                <MenuContainer {...props}>
                  <Categories {...props} />
                </MenuContainer>
              );
            else return <Redirect to="notAuthed" />;
          }}
        />
      ),
    },
    {
      routeName: "/Managers",
      Route: (
        <Route
          path="/Managers"
          key="/Managers"
          render={(props) => {
            if (isAuthedUser() && !isPM())
              return (
                <MenuContainer {...props}>
                  <Managers {...props} />
                </MenuContainer>
              );
            else return <Redirect to="notAuthed" />;
          }}
        />
      ),
    },
    {
      routeName: "/notifications",
      Route: (
        <Route
          path="/notifications"
          key="/notifications"
          render={(props) => {
            if (isAuthedUser())
              return (
                <MenuContainer {...props}>
                  <Notifications {...props} />
                </MenuContainer>
              );
            else return <Redirect to="notAuthed" />;
          }}
        />
      ),
    },
    {
      routeName: "/",
      Route: <Redirect key="/" to={isAuthedUser() ? "/Overview" : "/login"} />,
    },
  ]);
  return (
    <>
      {routes.map((item) => item.Route)}
      {props.children}
    </>
  );
};

export default Routes;
