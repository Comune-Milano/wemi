export const selectMansioniServizioErogato = `
      select    
      contenuto.id_contenuto as "idMansione",
      tl_testo_1 as "txTitoloMansione",
      pg_mansione_servizio as "order",
      nr_ordine_visualizzazione as "nrOrdineVisualizzazione" 
      from    wemi2.contenuto
      inner join wemi2.r_mansione_serv_erog_ente as relMansione
      ON id_mansione = contenuto.id_contenuto and id_servizio_ente = $[id_servizio_ente]
	    inner join wemi2.contenuto_stt as mansione ON mansione.id_contenuto = contenuto.id_contenuto
            where  ty_contenuto=5 and mansione.cd_stato_contenuto=2 and mansione.ts_variazione_stato = 
			(SELECT MAX(ts_variazione_stato)
			 FROM wemi2.contenuto_stt
			 where id_contenuto = mansione.id_contenuto
			) and contenuto.id_contenuto
      in (select id_mansione
      from wemi2.r_mansione_serv_erog_ente 
    where id_servizio_ente = $[id_servizio_ente])
      `;