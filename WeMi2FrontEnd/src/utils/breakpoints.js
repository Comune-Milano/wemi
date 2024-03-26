/** @format */

const breakpoints = {
  xs: 0,
  xsm: 321,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1100,
  xxl: 1440,
  xxxl: 1920,
  xxxxl: 2048,
};

export const breakpointsValues = Object.keys(breakpoints).map(i => ({
  label: i,
  size: breakpoints[i],
}));

export default breakpoints;
