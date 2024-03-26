import { CALCOLA_SIM,APPLICA_PARAMETRI } from 'types/actions';

export const simulaCosto = (element) => ({
    type: CALCOLA_SIM,
    element
});

export const addParameter = (element) => ({
    type: APPLICA_PARAMETRI,
    element
});