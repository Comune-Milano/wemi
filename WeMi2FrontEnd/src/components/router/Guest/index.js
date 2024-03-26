/** @format */

import React from 'react';
import Route from 'components/router/Route';
import { Redirect } from 'react-router-dom';
import { PAGE_HOME_URL } from 'types/url';
import { connect } from 'react-redux';
import { isAuthenticatedSelector } from 'redux-modules/selectors/userSelectors';
import GuestRoutePropTypes from './propTypes';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? <Component {...props} /> : <Redirect to={PAGE_HOME_URL} />
    }
  />
);
GuestRoute.displayName = 'GuestRoute';
GuestRoute.propTypes = GuestRoutePropTypes;

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticatedSelector(state),
});

export default connect(mapStateToProps)(GuestRoute);
