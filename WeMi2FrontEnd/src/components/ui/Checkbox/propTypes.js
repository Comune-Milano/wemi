/** @format */

import exact from 'prop-types-exact';
import PropTypes from 'prop-types';

const CheckboxPropTypes = exact({
  defaultvalue: PropTypes.bool,
  boxWidth: PropTypes.string,
  boxHeight: PropTypes.string,
  noLabel: PropTypes.bool,
  fontSize: PropTypes.string,
  label: PropTypes.string,
  bordercolor: PropTypes.string,
  checkcolor: PropTypes.string,
});

export default CheckboxPropTypes;
