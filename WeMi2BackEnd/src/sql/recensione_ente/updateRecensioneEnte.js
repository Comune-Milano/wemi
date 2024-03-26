import tabelle from 'tabelle';

export const updateRecensioneEnte = `
UPDATE ${tabelle.recensione_ente}
SET  
  qt_media_singola_recensione = $[mediaRecensione],
  js_dati_recensione=$[jsonRecensione],  
  ts_creazione= localtimestamp 
WHERE id_rich_serv_rec=$[idRichiestaEnte]`;