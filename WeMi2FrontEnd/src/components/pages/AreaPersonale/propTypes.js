/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

const AreaPersonalePropTypes = exact({
  Title: PropTypes.objectOf(JSON).isRequired,
  Card: PropTypes.objectOf(JSON).isRequired,
  onClick: PropTypes.func,
});
export default AreaPersonalePropTypes;
