/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { valuesTranslations } from 'i18n';

const NotFoundRoutePropTypes = exact({
  locale: PropTypes.oneOf(valuesTranslations).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  computedMatch: PropTypes.shape({
    params: PropTypes.shape({
      path: PropTypes.shape(exact({})),
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
});

export default NotFoundRoutePropTypes;
