/** @format */

import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

const HeaderPropTypes = exact({
  intl: intlShape,
  title: PropTypes.string,
  titleBold: PropTypes.string,
  fontsize: PropTypes.string,
});

export default HeaderPropTypes;
