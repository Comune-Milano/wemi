
export const extractServiceEnter = `
SELECT tl_testo_1, nm_ente
FROM wemi2.richiesta_servizio_ente
    INNER join wemi2.servizio_erogato_ente 
      ON servizio_erogato_ente.id_servizio_ente = richiesta_servizio_ente.id_servizio_erogato_ente
    INNER join wemi2.ente
      ON wemi2.servizio_erogato_ente.id_ente_erogatore=wemi2.ente.id_ente
    INNER join wemi2.servizio 
      ON servizio.id_servizio = servizio_erogato_ente.id_servizio_riferimento
    INNER join wemi2.contenuto 
      ON contenuto.id_contenuto = servizio.id_servizio
WHERE wemi2.richiesta_servizio_ente.id_richiesta_servizio_ente=$[idRichiestaEnte]
`;