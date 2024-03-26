export const verificaUtente  = ` 
    SELECT rse.id_richiesta_servizio_ente
    FROM wemi2.richiesta_servizio_ente as rse
    INNER JOIN wemi2.servizio_erogato_ente as see ON 
    see.id_servizio_ente = rse.id_servizio_erogato_ente
    INNER JOIN wemi2.ente as e ON e.id_ente = see.id_ente_erogatore
    WHERE e.id_utente_admin = $[idUtente] and rse.id_richiesta_servizio_ente = $[idRichiestaEnte]
    UNION
    SELECT rse.id_richiesta_servizio_ente
    FROM wemi2.richiesta_servizio_ente as rse
    INNER JOIN wemi2.servizio_erogato_ente as see ON 
	see.id_servizio_ente = rse.id_servizio_erogato_ente
    INNER JOIN wemi2.ente as e ON see.id_ente_erogatore = e.id_ente
    INNER JOIN wemi2.r_operatore_ente as roe ON e.id_ente = roe.id_ente
    WHERE roe.id_utente = $[idUtente] and rse.id_richiesta_servizio_ente = $[idRichiestaEnte]

`;

export const verificaUtenteCittadino  = ` 
    SELECT rse.id_richiesta_servizio_ente
    FROM wemi2.richiesta_servizio_base AS rsb
    INNER JOIN wemi2.richiesta_servizio_ente AS rse
    ON rsb.id_richiesta_servizio_base = rse.id_richiesta_servizio_base
    WHERE rsb.id_utente_richiedente = $[idUtente] and rse.id_richiesta_servizio_ente = $[idRichiestaEnte];
`;