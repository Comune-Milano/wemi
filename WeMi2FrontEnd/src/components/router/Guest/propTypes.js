/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { valuesTranslations } from 'i18n';

const GuestRoutePropTypes = exact({
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  locale: PropTypes.oneOf(valuesTranslations).isRequired,
  path: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
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
  dispatch: PropTypes.func.isRequired,
});

export default GuestRoutePropTypes;
