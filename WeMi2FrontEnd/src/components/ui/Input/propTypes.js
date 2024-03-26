/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

const InputPropTypes = exact({
  intl: PropTypes.shape(exact({})).isRequired,
  intlPlaceholder: PropTypes.string,
  intlLabel: PropTypes.string,
});

export default InputPropTypes;
