/** @format */

import exact from 'prop-types-exact';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

const AnchorLinkPropTypes = exact({
  value: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  intl: intlShape,
});

export default AnchorLinkPropTypes;
