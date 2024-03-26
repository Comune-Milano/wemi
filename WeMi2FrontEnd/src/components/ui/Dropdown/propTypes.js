/** @format */

import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

const DropdownPropTypes = exact({
  intl: intlShape,
  value: PropTypes.string,
});

export default DropdownPropTypes;
