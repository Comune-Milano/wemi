import tabelle from 'tabelle';

export const updateRecensioneEnteStt = `
UPDATE ${tabelle.recensione_ente_stt}
SET  
  ts_variazione_stato= localtimestamp, 
  cd_stato_recensione= $[cdStatoRecensione]
WHERE id_rich_serv_rec = $[idRichiestaEnte] RETURNING *;`;