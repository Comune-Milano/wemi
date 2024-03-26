/** @format */

import { GET_BROWSER_INFO, SET_REFERRER, SET_ROUTE_PATH, RESET_FIELDS } from 'types/actions';

export const setBrowser = browser => ({
  type: GET_BROWSER_INFO,
  browser,
});

export const setReferrer = referrer => ({
  type: SET_REFERRER,
  referrer,
});

export const setPathName = pathname => ({
  type: SET_ROUTE_PATH,
  pathname,
});


export const resetFields = fields => ({
  type: RESET_FIELDS,
  fields,
});
