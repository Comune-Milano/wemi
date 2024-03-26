export const verificaUtente  = ` SELECT *
FROM wemi2.richiesta_servizio_base
WHERE id_richiesta_servizio_base = $[idRichiestaBase] and id_utente_richiedente = $[idUtente];
`;