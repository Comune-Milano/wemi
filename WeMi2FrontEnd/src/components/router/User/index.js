/** @format */

import React from 'react';
import Route from 'components/router/Route';
import { Redirect } from 'react-router-dom';
import { PAGE_LOGIN_URL } from 'types/url';
import { connect } from 'react-redux';
import { localeSelector } from 'redux-modules/selectors/localeSelectors';
import { isAuthenticatedSelector } from 'redux-modules/selectors/userSelectors';
import UserRoutePropTypes from './propTypes';

const UserRoute = ({ isAuthenticated, locale, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to={PAGE_LOGIN_URL} />
    }
  />
);
UserRoute.displayName = 'UserRoute';
UserRoute.propTypes = UserRoutePropTypes;

const mapStateToProps = state => ({
  locale: localeSelector(state),
  isAuthenticated: isAuthenticatedSelector(state),
});

export default connect(mapStateToProps)(UserRoute);
