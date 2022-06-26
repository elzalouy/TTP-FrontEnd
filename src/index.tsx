import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import themes from "./themes";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "./helpers/i18n";
import "./assets/fonts/Cairo-Black.ttf";
import "./assets/fonts/Cairo-Bold.ttf";
import "./assets/fonts/Cairo-Regular.ttf";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes()}>
            <CssBaseline />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
