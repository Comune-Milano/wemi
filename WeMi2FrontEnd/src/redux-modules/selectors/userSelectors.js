/** @format */

import memoize from 'fast-memoize';

const getUserAutenticatedState = state => !!state.user.userId;
export const isAuthenticatedSelector = memoize(getUserAutenticatedState);

const getUserState = state => state.datiLogin;
export const userSelector = memoize(getUserState);

// const getUserState = state => state.user;
// export const userSelector = memoize(getUserState);

const getUsernameState = state => state.user.email;
export const usernameSelector = memoize(getUsernameState);

// const getUserIdState = state => state.user.userId;
// export const userIdSelector = memoize(getUserIdState);

