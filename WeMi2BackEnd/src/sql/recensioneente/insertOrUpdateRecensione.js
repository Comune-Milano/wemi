import tabelle from 'tabelle';

export const insertOrUpdateRecensione = (exist) => {

    let baseQuery='';
    if (exist) {
        baseQuery += `UPDATE ${tabelle.recensione_ente}
SET js_dati_recensione = $[js_dati_recensione:json],
cd_stato_rec = $[cd_stato_rec],
qt_media_singola_recensione = $[qt_media_singola_recensione]
WHERE id_rich_serv_rec = $[id_rich_serv_rec] and pg_rich_serv_rec = (SELECT MAX(pg_rich_serv_rec)
FROM wemi2.recensione_servizio_ente
WHERE id_rich_serv_rec = $[id_rich_serv_rec]);` ;
    } else {
        baseQuery += ` INSERT INTO ${tabelle.recensione_ente} (
        id_rich_serv_rec,
        qt_media_singola_recensione,
        js_dati_recensione,
        js_dati_recensione_wemi,
        ts_creazione,
        cd_stato_rec,
        cd_stato_rec_wemi
      )
      VALUES (
        $[id_rich_serv_rec],
        $[qt_media_singola_recensione],
        $[js_dati_recensione:json],
        null,
        localtimestamp,
        $[cd_stato_rec],
        null
      );`;
    }

    baseQuery += `INSERT INTO ${tabelle.recensione_ente_stt} (
        id_rich_serv_rec,
        ts_variazione_stato,
        cd_stato_recensione,
        id_utente
      )
      VALUES (
       $[id_rich_serv_rec],
       localtimestamp,
       $[cd_stato_rec],
       $[idUtente]
      )
      `;

      return baseQuery;

}
