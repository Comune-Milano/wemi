/** @format */

import memoize from 'fast-memoize';

const getLocaleState = state => state.locale;
export const localeSelector = memoize(getLocaleState);
