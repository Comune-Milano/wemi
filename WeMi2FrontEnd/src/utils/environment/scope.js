
/* eslint-disable no-underscore-dangle */

export const PROCESS_ENV = process.env;

export const WINDOW_ENV = window._wemiEnv_;

export const ENV_SCOPE = WINDOW_ENV || PROCESS_ENV;
