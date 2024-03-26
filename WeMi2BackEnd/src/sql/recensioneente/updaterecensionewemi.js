export const updateRecensioneWeMi = `
  UPDATE wemi2.recensione_servizio_ente
  SET 
    js_dati_recensione_wemi = $[js_dati_recensione],
    -- ts_creazione = localtimestamp,
    cd_stato_rec_wemi = $[statoRecensione]
  WHERE id_rich_serv_rec = $[id_rich_serv_rec] 
    and pg_rich_serv_rec = $[pg_rich_serv_rec]
  RETURNING id_rich_serv_rec as "idRichiesta"
`;