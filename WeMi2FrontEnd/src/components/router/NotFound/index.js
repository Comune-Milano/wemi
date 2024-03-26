/** @format */

import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { PAGE_HOME_URL } from 'types/url';
import { localeSelector } from 'redux-modules/selectors/localeSelectors';
import NotFoundRoutePropTypes from './propTypes';

const RouteNotFound = () => <Redirect to={`${PAGE_HOME_URL}`} />;

RouteNotFound.displayName = 'RouteNotFound';
RouteNotFound.propTypes = NotFoundRoutePropTypes;

const mapStateToProps = state => ({
  locale: localeSelector(state),
});

export default connect(mapStateToProps)(RouteNotFound);
