/** @format */

import memoize from 'fast-memoize';

const getTrackingInfoState = state => state.tracking.size;
export const screenSizeSelector = memoize(getTrackingInfoState);
