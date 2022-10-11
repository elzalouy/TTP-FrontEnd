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
import { useDispatch } from "react-redux";
import { selectAppLoading, setAppLoading } from "src/models/Ui";
import { useAppSelector } from "src/models/hooks";
import { selectSatistics } from "src/models/Statistics";
import {
  AuthActions,
  getUserInfo,
  logout,
  selectUserState,
} from "src/models/Auth";
import { getUserTokenInfo, isAuthedUser } from "src/services/api";
import { getAllDepartments } from "src/models/Departments";
import { getAllCategories } from "src/models/Categories";
import { getAllClients } from "src/models/Clients";
import { getManagers } from "src/models/Managers";
import { getAllProjects, getAllTasks } from "src/models/Projects";
import { getUnNotified } from "src/models/Notifications";

const App: React.FC = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setAppLoading(true));
    return () => {
      dispatch(setAppLoading(false));
    };
  }, []);

  const [mounted, setMounted] = React.useState(false);
  const userState = useAppSelector(selectUserState);
  const [tokenInfo, setTokenInfo] = React.useState(getUserTokenInfo());
  React.useEffect(() => {
    if (isAuthedUser()) {
      setTokenInfo(getUserTokenInfo());
      if (tokenInfo?.id)
        dispatch(
          getUserInfo({
            id: tokenInfo?.id,
          })
        );
      dispatch(AuthActions.changeAuth(true));
    }
  }, [userState.authed, dispatch]);

  React.useEffect(() => {
    if (tokenInfo?.id && mounted === false) {
      dispatch(getAllDepartments(null));
      dispatch(getAllCategories(null));
      dispatch(getAllClients(null));
      dispatch(getManagers(null));
      dispatch(getAllProjects(null));
      dispatch(getAllTasks(null));
      dispatch(getUnNotified(null));
      setMounted(true);
    }
  }, [tokenInfo]);

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
