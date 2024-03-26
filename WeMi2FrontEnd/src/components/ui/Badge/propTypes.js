/** @format */

import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

const BadgePropTypes = exact({
  intl: intlShape,
  bgcolor: PropTypes.string,
  width: PropTypes.string,
  radius: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  fontsize: PropTypes.string,
  value: PropTypes.string,
});

export default BadgePropTypes;
