const EstraiRecensioni = (tabelle) =>{
	const sql = `
	SELECT
		recensione.id_rich_serv_rec, 
		recensione.qt_media_singola_recensione, 
		recensione.js_dati_recensione, 
		recensione.js_dati_recensione_wemi,
		recensione.ts_creazione,
		ente.nm_ente,
		contenuto.tl_testo_1,
		utente.tx_nome_utente 
	FROM
		wemi2.recensione_servizio_ente recensione
		inner join wemi2.recensione_servizio_ente_stt stt on stt.id_rich_serv_rec = recensione.id_rich_serv_rec 
		inner join wemi2.richiesta_servizio_ente richiesta_ente on richiesta_ente.id_richiesta_servizio_ente = recensione.id_rich_serv_rec
		inner join wemi2.richiesta_servizio_base richiesta_base on richiesta_base.id_richiesta_servizio_base = richiesta_ente.id_richiesta_servizio_base
		inner join wemi2.utente utente on utente.id_utente = richiesta_base.id_utente_richiedente
		inner join wemi2.servizio_erogato_ente servizio_ente on servizio_ente.id_servizio_ente = richiesta_ente.id_servizio_erogato_ente 
		inner join wemi2.ente ente on servizio_ente.id_ente_erogatore = ente.id_ente 
		inner join wemi2.contenuto on servizio_ente.id_servizio_riferimento = contenuto.id_contenuto
	WHERE 
		richiesta_ente.id_servizio_erogato_ente = $[idServizioRiferimento]
		and stt.ts_variazione_stato = (
				SELECT MAX(iistt.ts_variazione_stato)
				FROM wemi2.recensione_servizio_ente_stt iistt
				WHERE iistt.id_rich_serv_rec = stt.id_rich_serv_rec
			)
		and stt.cd_stato_recensione = '3'
	ORDER BY recensione.ts_creazione DESC;
	`;

	return sql;
};

export default EstraiRecensioni;
