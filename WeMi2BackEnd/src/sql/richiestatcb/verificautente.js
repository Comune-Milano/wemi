export const verificaUtente  = ` SELECT *
FROM wemi2.richiesta_servizio_tcb
INNER JOIN wemi2.richiesta_servizio_ente ON richiesta_servizio_ente.id_richiesta_servizio_ente = id_richiesta_servizio_tcb
INNER JOIN wemi2.richiesta_servizio_base ON richiesta_servizio_ente.id_richiesta_servizio_base = richiesta_servizio_base.id_richiesta_servizio_base
WHERE id_richiesta_servizio_tcb = $[idRichiestaTcb] and id_utente_richiedente = $[idUtente];
`;