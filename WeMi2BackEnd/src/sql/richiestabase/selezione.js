/**
  * Finding the idRichiestaBase associated to the idRichiestaTCB           
  */
export const findRichiestaBaseByTcb = `SELECT id_richiesta_servizio_base as "idRichiestaBase" FROM wemi2.richiesta_servizio_ente WHERE id_richiesta_servizio_ente IN ($[idRichiesteEsperienze:csv])`;
