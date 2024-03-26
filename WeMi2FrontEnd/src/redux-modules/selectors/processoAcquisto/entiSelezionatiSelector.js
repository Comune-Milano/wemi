import { createSelector } from 'reselect';

export const entiSelezionatiSelector = createSelector(
  state => state.forwardEnti,
  forwardEnti => forwardEnti.entiSelezionati
);
