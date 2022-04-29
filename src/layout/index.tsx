import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import "./index.css"
import {useHistory} from "react-router"
import { Route ,Redirect} from "react-router-dom";
import Sidebar from "./partials/Sidebar";
import Bar from "./partials/TopBar/AppBar";
import { useAppSelector } from "../redux/hooks";
import { selectIsAuth } from "../redux/Auth";

interface Props {
  component: React.ReactNode;
  path: string;
}

const LoggedInContainer: React.FC<Props> = ({
  component: Component,
  ...rest
}: any) => {

  const isAuth = useAppSelector(selectIsAuth);
  const history = useHistory();

  useEffect(() => {
    if(!isAuth){
      history.replace("/")
    }
  }, [isAuth])
  

  if(!isAuth){
    return <Redirect to={"/"}/>
  }

  return (
    <div className="main">
      <Route
        {...rest}
        render={(props) => (
          <div key={rest.location.key} style={{ display: "flex" }}>
            <Sidebar {...rest} {...props} />
            <Bar {...props} {...rest} />
            <Component key={rest?.location?.key} {...props} {...rest} />
          </div>
        )}
      />
    </div>
  );
};

export default LoggedInContainer;
