/** @format */

import memoize from 'fast-memoize';

const getPathState = state => state.routing.url;
export const pathSelector = memoize(getPathState);
