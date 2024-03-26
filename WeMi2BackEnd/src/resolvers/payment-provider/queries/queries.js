
export const selectPaymentIdentificationBoundary = `
  SELECT 
    rse.id_richiesta_servizio_ente AS "idRichiestaEnte",
    see.id_ente_erogatore AS "idEnte",
    rsb.id_utente_richiedente AS "idUtenteRichiedente"
  FROM wemi2.richiesta_servizio_ente rse 
  INNER JOIN wemi2.servizio_erogato_ente see ON
    rse.id_servizio_erogato_ente = see.id_servizio_ente
  INNER JOIN wemi2.richiesta_servizio_base rsb ON
    rsb.id_richiesta_servizio_base = rse.id_richiesta_servizio_base
  WHERE rse.id_richiesta_servizio_ente = $[idRichiestaEnte];
`;

export const selectIdEnteByRequestId = `
  SELECT 
    rse.id_richiesta_servizio_ente AS "idRichiestaEnte",
    see.id_ente_erogatore AS "idEnte"
  FROM wemi2.richiesta_servizio_ente rse 
  INNER JOIN wemi2.servizio_erogato_ente see ON
    rse.id_servizio_erogato_ente = see.id_servizio_ente
  WHERE rse.id_richiesta_servizio_ente = $[idRichiestaEnte];
`;