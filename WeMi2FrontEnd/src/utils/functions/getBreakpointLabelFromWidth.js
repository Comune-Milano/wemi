/** @format */

import { breakpointsValues } from '../breakpoints';

const getBreakpointLabelFromWidth = width => {
  let breakpointLabel;
  const breakpoint = breakpointsValues.find(el => width <= el.size);

  if (!breakpoint) breakpointLabel = 'XXXL';
  else breakpointLabel = breakpoint.label;

  return breakpointLabel;
};

export default getBreakpointLabelFromWidth;
