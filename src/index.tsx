import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import store from "./models/store";
import themes from "./coreUI/themes";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// App
import "./helpers/i18n";
import "./assets/fonts/Cairo-Black.ttf";
import "./assets/fonts/Cairo-Bold.ttf";
import "./assets/fonts/Cairo-Regular.ttf";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
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
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
