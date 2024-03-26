/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

const LoginPropTypes = exact({
  onClickLogin: PropTypes.func.isRequired,
});

export default LoginPropTypes;
