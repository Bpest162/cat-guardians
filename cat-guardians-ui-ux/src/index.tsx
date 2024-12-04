import "./index.scss";

import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import ErrorFallback from "./components/auth/error";
import i18n from "./i18n";
import App from "./pages/app/App";
import store from "./store";
import Themes from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.Fragment>
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <StyledEngineProvider injectFirst={true}>
          <ThemeProvider theme={Themes.createDefaultTheme()}>
            <I18nextProvider i18n={i18n}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </I18nextProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ErrorBoundary>
    </Provider>
  </React.Fragment>
);
