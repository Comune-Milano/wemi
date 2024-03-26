/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { valuesTranslations } from 'i18n';

const UserRoutePropTypes = exact({
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  computedMatch: PropTypes.shape(
    exact({
      isExact: PropTypes.bool.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      params: PropTypes.shape({
        path: PropTypes.shape(exact({})),
      }).isRequired,
    }),
  ).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  locale: PropTypes.oneOf(valuesTranslations).isRequired,
});

export default UserRoutePropTypes;
