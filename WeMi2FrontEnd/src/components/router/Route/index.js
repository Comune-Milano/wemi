/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route as ReactRoute, Redirect } from 'react-router-dom';
import { setLocale as setLocaleAction } from 'redux-modules/actions/localeActions';
import { setPathName as setPathNameAction } from 'redux-modules/actions/generalActions';
import { DEFAULT_LOCALE } from 'i18n';
import { checkLocale } from 'utils/functions';
import RoutePropTypes from './propTypes';

const Route = ({ setLocale, setPathName, ...props }) => {
  const { computedMatch, location } = props;
  const { params } = computedMatch;
  const { locale } = params;
  const localeFound = checkLocale(locale);

  useEffect(
    () => {
      const { pathname } = location;
      const pathnameWithoutLocale = pathname.substring(3);
      setPathName(pathnameWithoutLocale);
    },
    [location]
  );

  useEffect(() => {
    if (localeFound) setLocale(locale);
    else setLocale(DEFAULT_LOCALE);
  }, [locale]);

  return localeFound ? <ReactRoute {...props} /> : <Redirect to={`/${DEFAULT_LOCALE}`} />;
};

Route.displayName = 'Route';
// Route.propTypes = RoutePropTypes;

const mapDispatchToProps = {
  setLocale: setLocaleAction,
  setPathName: setPathNameAction,
};

export default connect(
  null,
  mapDispatchToProps,
)(Route);
