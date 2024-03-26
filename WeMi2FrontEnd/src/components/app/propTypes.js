/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { valuesUrl } from 'types/url';
import { valuesTranslations } from 'i18n';

const AppPropTypes = exact({
  dispatch: PropTypes.func.isRequired,
  locale: PropTypes.oneOf(valuesTranslations).isRequired,
  urlPath: PropTypes.oneOf(valuesUrl),
});

export default AppPropTypes;
