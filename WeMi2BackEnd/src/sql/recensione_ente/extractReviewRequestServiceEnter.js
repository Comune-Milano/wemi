export const extractReviewRequestServiceEnter = `
SELECT  
  id_rich_serv_rec, 
  qt_media_singola_recensione, 
  js_dati_recensione, 
  js_dati_recensione_wemi, 
  ts_creazione
FROM wemi2.recensione_servizio_ente
WHERE id_rich_serv_rec =$[idRichiestaEnte]`;
