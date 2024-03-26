/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { valuesTranslations } from 'i18n';

const SwitchLocalePropTypes = exact({
  locale: PropTypes.oneOf(valuesTranslations).isRequired,
  pathname: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
});

export default SwitchLocalePropTypes;
