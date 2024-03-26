
import { createSelector } from 'reselect';

export const errorDTOSelector = createSelector(
  state => state.error,
  error => error.errorDTO
);
