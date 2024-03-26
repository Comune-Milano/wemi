import { REQUEST_LOG, WEMI_ERROR } from 'types/actions';

export const AddClientError = element => ({
  type: REQUEST_LOG,
  element,
});

export const setWeMiError = errorDTO => ({
  type: WEMI_ERROR,
  errorDTO,
});
