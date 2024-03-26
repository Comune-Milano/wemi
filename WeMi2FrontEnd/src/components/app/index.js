/** @format */

import React from "react";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import messages from "i18n";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "theme/global-styles";
import theme from "theme";
import { BrowserRouter } from "react-router-dom";
import { PUBLIC_URL } from 'types/url';
import Navbar from 'components/navigation/Navbar';
import { localeSelector } from 'redux-modules/selectors/localeSelectors';
import Footer from 'components/navigation/Footer';
import ScrollToTop from 'components/ui/ScrollToTop/ScrollToTop';
import OverlaySpinner from "components/ui/OverlaySpinner";
import { BreakpointProvider } from 'hedron';
import breakpoints from 'utils/breakpoints';
import Login from 'components/ui/Login';
import AuthenticationProvider from "services/Authentication/AuthenticationProvider";
import AuthenticationLoader from "services/Authentication/AuthenticationLoader";
import { loggerService, LoggerContext } from 'services/Logger';
import { EventBusProvider } from 'services/EventBus';
import { AppRoutes } from "components/router/AppRoutes/AppRoutes";
/** @deprecated Provider */
import { __WEBSOCKET_PATH__, __WEBSOCKET_HOST__ } from "utils/environment/variables";
import 'url-search-params-polyfill';
import { GlobalErrorHandler } from "errors/components/GlobalErrorHandler";
import { SubscriptionClientCtxProvider } from "hooks/subscriptionClient/useSubscriptionClient";
import { CookieBanner } from "components/navigation/CookieBanner";
import ErrorBoundary from "errors/components/ErrorBoundary";
import { ExternalRedirectManagerContextProvider } from "hooks/externalRedirect/useExternalRedirect";
import AppPropTypes from './propTypes';

const App = ({ locale }) => (
  <IntlProvider locale={locale} messages={messages[locale]}>
    <BrowserRouter basename={PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <SubscriptionClientCtxProvider
          wsPath={__WEBSOCKET_PATH__ || undefined}
          wsHost={__WEBSOCKET_HOST__ || undefined}
        >
          <BreakpointProvider breakpoints={breakpoints}>
            <LoggerContext.Provider value={loggerService}>
              <EventBusProvider>
                <AuthenticationProvider>
                  <ExternalRedirectManagerContextProvider>
                    <GlobalStyle />
                    <ScrollToTop />
                    <Navbar />
                    <Login />
                    <GlobalErrorHandler />
                    <OverlaySpinner />
                    <AuthenticationLoader>
                      <ErrorBoundary>
                        <AppRoutes />
                        {/* <CookieBanner /> */}
                      </ErrorBoundary>
                    </AuthenticationLoader>
                    <Footer />
                  </ExternalRedirectManagerContextProvider>
                </AuthenticationProvider>
              </EventBusProvider>
            </LoggerContext.Provider>
          </BreakpointProvider>
        </SubscriptionClientCtxProvider>
      </ThemeProvider>
    </BrowserRouter>
  </IntlProvider>
);

App.displayName = 'App';
App.propTypes = AppPropTypes;

const mapStateToProps = state => ({
  locale: localeSelector(state),
});

export default connect(mapStateToProps)(App);
