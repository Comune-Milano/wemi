/** @format */

import { CHANGE_LOCALE } from 'types/actions';

export const setLocale = lang => ({
  type: CHANGE_LOCALE,
  payload: lang,
});
