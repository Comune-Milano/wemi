
export const extractUserName = `
SELECT wemi2.utente.ptx_username, utente.tx_nome_utente, utente.tx_cognome_utente
FROM wemi2.richiesta_servizio_ente
      INNER join wemi2.richiesta_servizio_base 
        ON richiesta_servizio_base.id_richiesta_servizio_base = richiesta_servizio_ente.id_richiesta_servizio_base
      INNER join wemi2.utente 
        ON wemi2.utente.id_utente = wemi2.richiesta_servizio_base.id_utente_richiedente
WHERE wemi2.richiesta_servizio_ente.id_richiesta_servizio_ente=  $[idRichiestaEnte]
`;