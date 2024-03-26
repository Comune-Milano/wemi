import tabelle from 'tabelle';

export const selectByIdRichiestaEnte = `
SELECT 
id_richiesta_servizio_base 
FROM wemi2.richiesta_servizio_ente
where id_richiesta_servizio_ente=$[idRichiestaTCB]
  `;