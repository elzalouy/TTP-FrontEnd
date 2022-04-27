import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
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

  const auth = useAppSelector(selectIsAuth);

  if(!!auth===false){
    return <Redirect to={"/"}/>
  }

  return (
    <>
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
    </>
  );
};

export default LoggedInContainer;
