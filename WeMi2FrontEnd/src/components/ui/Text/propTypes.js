/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { valuesColor, valuesSize, valuesTag, valuesWeight, valuesTransform } from 'theme';

const TextPropTypes = exact({
  value: PropTypes.string.isRequired,
  intlFormatter: PropTypes.bool,
  color: PropTypes.oneOf(valuesColor).isRequired,
  tag: PropTypes.oneOf(valuesTag).isRequired,
  size: PropTypes.oneOf(valuesSize).isRequired,
  weight: PropTypes.oneOf(valuesWeight),
  transform: PropTypes.oneOf(valuesTransform),
  onClick: PropTypes.func,
});

export default TextPropTypes;
