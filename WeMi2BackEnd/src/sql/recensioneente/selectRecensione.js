import tabelle from 'tabelle';

export const selectRecensione = (pgRichServRec) => {
  if(pgRichServRec){
    return `
    SELECT *
    FROM ${tabelle.recensione_ente}
    WHERE id_rich_serv_rec = $[id_rich_serv_rec] and pg_rich_serv_rec = $[pg_rich_serv_rec]`;
  } else {
    return `
    SELECT *
    FROM ${tabelle.recensione_ente}
    WHERE id_rich_serv_rec = $[id_rich_serv_rec] and pg_rich_serv_rec = (
        SELECT MAX(pg_rich_serv_rec)
        FROM ${tabelle.recensione_ente}
        WHERE id_rich_serv_rec = $[id_rich_serv_rec]
      )`;
  }
  }

export const selectRecensioneTCB = `
SELECT  id_rich_serv_rec, qt_media_singola_recensione, js_dati_recensione, js_dati_recensione_wemi, ts_creazione,
cd_stato_rec,cd_stato_rec_wemi, pg_rich_serv_rec
  FROM wemi2.recensione_servizio_ente
WHERE id_rich_serv_rec =$[id_rich_serv_rec]
AND pg_rich_serv_rec = (SELECT MAX(pg_rich_serv_rec)
                        FROM wemi2.recensione_servizio_ente
                        WHERE id_rich_serv_rec = $[id_rich_serv_rec]
                        )`;
