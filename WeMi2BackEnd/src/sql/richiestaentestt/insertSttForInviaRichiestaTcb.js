import tabelle from 'tabelle';

export const insertSttForInviaRichiestaTcb = `
INSERT INTO wemi2.richiesta_servizio_ente_stt(
  id_richiesta_servizio_ente, ts_variazione_stato, cd_stato_ric_serv_ente, cd_stato_chat, id_utente)
  VALUES ($[idRichiestaTCB], localtimestamp, 10, 0,$[idUtente]);
INSERT INTO wemi2.richiesta_servizio_base_stt(
   id_richiesta_servizio, ts_variazione_stato, cd_stato_richiesta_servizio, id_utente)
   VALUES ($[id_richiesta_servizio_base], localtimestamp, 5, $[idUtente]); 
UPDATE wemi2.richiesta_servizio_ente
   SET  im_costo_totale_ente= $[costoTCB]
   WHERE id_richiesta_servizio_ente=$[idRichiestaTCB];    
  `;