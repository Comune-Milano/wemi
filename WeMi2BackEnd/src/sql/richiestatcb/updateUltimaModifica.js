import tabelle from 'tabelle';

export const updateUltimaModifica = `
UPDATE ${tabelle.richiesta_servizio_tcb}
SET ts_ult_modifica = localtimestamp,
id_utente_ult_var = $[idUtente]
WHERE id_richiesta_servizio_tcb = $[idRichiestaTcb];                         
`;
