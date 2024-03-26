/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

const LogoutPropTypes = exact({
  onClickLogout: PropTypes.func.isRequired,
});

export default LogoutPropTypes;
