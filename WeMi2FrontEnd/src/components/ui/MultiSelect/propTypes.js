/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

const SelectPropTypes = exact({
  intl: PropTypes.shape(exact({})).isRequired,
  intlPlaceholder: PropTypes.string,
});

export default SelectPropTypes;
