/** @format */

import memoize from 'fast-memoize';

const getUserState = state => state.datiLogin;
export const userSelector = memoize(getUserState);

