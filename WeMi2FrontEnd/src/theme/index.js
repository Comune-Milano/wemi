/** @format */

import colors from './colors';
import fonts from './fonts';
import spacing from './spacing';

const globalTheme = {
  colors,
  fonts,
  spacing,
};

export { default as fonts } from './fonts';
export { default as colors } from './colors';
export { default as spacing } from './spacing';
export { valuesColor } from './colors';
export { valuesSpacing } from './spacing';
export { valuesSize, valuesAlign, valuesTransform, valuesWeight, valuesTag } from './fonts';

const exportTheme = globalTheme;

export default exportTheme;
