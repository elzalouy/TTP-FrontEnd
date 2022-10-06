import { Route, Switch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllClients } from "../models/Clients";
import { getPMs } from "../models/PM";
import { getAllDepartments } from "../models/Departments";
import { getAllCategories } from "../models/Categories";
import { getAllProjects, getAllTasks } from "../models/Projects";
import { ToastContainer } from "react-toastify";
import AppHooks from "../coreUI/contexts/AppHooks";
import PopUps from "../coreUI/contexts/Modals";
import { Box } from "@mui/system";
import { getUnNotified } from "../models/Notifications";
import { getUserTokenInfo, isAuthedUser } from "../services/api";
import { getUserInfo, logout, selectUserState } from "../models/Auth";
import UIComponents from "../views/UiComponents";
import Routes from "./Routes";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "swiper/css/navigation";
import "swiper/css";
import { useAppSelector } from "src/models/hooks";

const App: React.FC = (props) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const userState = useAppSelector(selectUserState);
  const [tokenInfo] = useState(getUserTokenInfo());
  useEffect(() => {
    if (tokenInfo && tokenInfo.id) {
      dispatch(
        getUserInfo({
          id: tokenInfo.id,
        })
      );
    } else dispatch(logout(true));
  }, []);

  useEffect(() => {
    if (tokenInfo?.id && !mounted) {
      dispatch(getAllDepartments(null));
      dispatch(getAllCategories(null));
      dispatch(getAllClients(null));
      dispatch(getPMs(null));
      dispatch(getAllProjects(null));
      dispatch(getAllTasks(null));
      dispatch(getUnNotified(null));
      setMounted(true);
    }
  }, [dispatch, mounted, tokenInfo, userState.authed]);

  return (
    <Box height={"100vh"} width="100%" bgcolor="#FAFAFB !important">
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
          <Routes />
          {process.env.NODE_ENV === "development" && (
            <Route key="/DevComponents" path="/Dev" component={UIComponents} />
          )}
        </Switch>
      </AppHooks>
    </Box>
  );
};

export default App;
