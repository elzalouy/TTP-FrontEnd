import { Route, Switch } from "react-router-dom";
import * as React from "react";
import { ToastContainer } from "react-toastify";
import AppHooks from "../coreUI/contexts/AppHooks";
import PopUps from "../coreUI/contexts/Modals";
import { Box } from "@mui/system";
import UIComponents from "../views/UiComponents";
import Routes from "./Routes";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "swiper/css/navigation";
import "swiper/css";

const App: React.FC = (props) => {
  return (
    <Box height={"100vh"} bgcolor="#FAFAFB !important">
      <AppHooks>
        <ToastContainer
          data-test-id="toastMessage"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          limit={1}
          draggable
        />
        <PopUps />
        <Switch>
          {process.env.NODE_ENV === "development" && (
            <Route key="/DevComponents" path="/Dev" component={UIComponents} />
          )}
          <Routes />
        </Switch>
      </AppHooks>
    </Box>
  );
};

export default App;
