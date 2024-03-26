/** @format */

import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

export const ColumnBasePropTypes = exact({
  fluid: PropTypes.bool,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xsShift: PropTypes.number,
  smShift: PropTypes.number,
  mdShift: PropTypes.number,
  lgShift: PropTypes.number,
  children: PropTypes.node.isRequired,
  divisions: PropTypes.array,
  className: PropTypes.string,
});

export const ColumnPropTypes = exact({
  ...ColumnBasePropTypes,
  flex: PropTypes.bool,
  justifycontent: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
  alignitems: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
});

export const RowBasePropTypes = exact({
  alignitems: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
  justifycontent: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
  divisions: PropTypes.array,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
});

export const RowPropTypes = exact({
  ...RowBasePropTypes,
  flex: PropTypes.bool,
  justifycontent: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
  alignitems: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
});

export const CenterPropTypes = exact({
  children: PropTypes.node.isRequired,
});
