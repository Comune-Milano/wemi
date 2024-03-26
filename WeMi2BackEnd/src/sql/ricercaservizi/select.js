
export const selectServicesFields = (
	where='',
	orderBy='',
) => `
SELECT 
  count(*) OVER() AS count,
	e.id_ente as "idEnte",
	e.nm_ente as "nomeEnte",
	id_servizio_riferimento as "idServizioRiferimento",
	e.nm_ente_completo as "nomeEnteCompleto",
	see.id_servizio_ente as "idServizioEnte",
	sp.cd_tipo_offerta_srv as "cdTipoOffertaServizio",
	sp.cd_tipo_servizio_erog as "cdTipoServizioErog",
	sppq.valore as "imPrezzoMinimo",
	sp.im_prezzo_minimo_cond as "imPrezzoMinimoCond",
	tl_testo_aggettivo as "tlTestoAggettivo",
	COALESCE(sppq.valore * $[quantita], 0) as "prezzoMinimoDaMostrare",
	recensioni.*
FROM
	wemi2.servizio_erogato_ente see
	INNER JOIN wemi2.ente e ON e.id_ente = see.id_ente_erogatore
	INNER JOIN wemi2.servizio_erogato_ente_stt stt ON stt.id_servizio_ente = see.id_servizio_ente
	INNER JOIN wemi2.ente_stt estt ON estt.id_ente = e.id_ente
	INNER JOIN wemi2.srv_prezzo sp ON sp.id_servizio_ente = see.id_servizio_ente
	LEFT JOIN wemi2.srv_prezzo_persone spp ON spp.id_prezzo = sp.id_prezzo
	LEFT JOIN wemi2.srv_prezzo_persone_quantita sppq ON spp.id_prezzo_persone = sppq.id_prezzo_persone
	LEFT JOIN wemi2.servizio ON servizio.id_servizio = see.id_servizio_riferimento
	LEFT JOIN wemi2.d_unita_prezzo_servizio ON d_unita_prezzo_servizio.cd_unita_prezzo = servizio.cd_unita_prezzo
	LEFT JOIN LATERAL (
		SELECT 
			COALESCE(AVG(irs.qt_media_singola_recensione), 0) as "mediaRecensioni",
			count(*) as "numeroRecensioni"
		FROM wemi2.recensione_servizio_ente irs
		INNER JOIN wemi2.recensione_servizio_ente_stt istt on istt.id_rich_serv_rec = irs.id_rich_serv_rec
		INNER JOIN wemi2.richiesta_servizio_ente ire on irs.id_rich_serv_rec = ire.id_richiesta_servizio_ente
		WHERE ire.id_servizio_erogato_ente = see.id_servizio_ente
		AND istt.ts_variazione_stato = (
			SELECT MAX(iistt.ts_variazione_stato)
			FROM wemi2.recensione_servizio_ente_stt iistt
			WHERE iistt.id_rich_serv_rec = istt.id_rich_serv_rec
		)
		AND istt.cd_stato_recensione = '3'
  ) as recensioni ON TRUE
WHERE
	id_servizio_riferimento = $[idServizioRiferimento]
	AND stt.ts_variazione_stato = (
		SELECT MAX(istt.ts_variazione_stato)
		FROM wemi2.servizio_erogato_ente_stt istt 
		WHERE istt.id_servizio_ente = see.id_servizio_ente
	)
	AND estt.ts_variazione_stato = (
		SELECT MAX(istt.ts_variazione_stato)
		FROM wemi2.ente_stt istt 
		WHERE istt.id_ente = e.id_ente
	)
	AND stt.cd_stato_dati_servizio_ente = 31
	AND estt.cd_stato_ente = '31'
	AND CURRENT_DATE >= sp.dt_inizio
	AND (CURRENT_DATE <= sp.dt_fine OR sp.dt_fine IS NULL)
	${where}
	${orderBy}
LIMIT $[limit] OFFSET $[offset]
`;

export const verifyServices = `
SELECT 
	e.id_ente as "idEnte",
	e.nm_ente as "nomeEnte",
	id_servizio_riferimento as "idServizioRiferimento",
	e.nm_ente_completo as "nomeEnteCompleto",
	see.id_servizio_ente as "idServizioEnte",
	sp.cd_tipo_offerta_srv as "cdTipoOffertaServizio",
	sp.cd_tipo_servizio_erog as "cdTipoServizioErog",
	sppq.valore as "imPrezzoMinimo",
	sp.im_prezzo_minimo_cond as "imPrezzoMinimoCond",
	tl_testo_aggettivo as "tlTestoAggettivo",
	COALESCE(sppq.valore * $[quantita], 0) as "prezzoMinimoDaMostrare",
	recensioni.*
FROM
	wemi2.servizio_erogato_ente see
	INNER JOIN wemi2.ente e ON e.id_ente = see.id_ente_erogatore
	INNER JOIN wemi2.servizio_erogato_ente_stt stt ON stt.id_servizio_ente = see.id_servizio_ente
	INNER JOIN wemi2.ente_stt estt ON estt.id_ente = e.id_ente
	INNER JOIN wemi2.srv_prezzo sp ON sp.id_servizio_ente = see.id_servizio_ente
	LEFT JOIN wemi2.srv_prezzo_persone spp ON spp.id_prezzo = sp.id_prezzo
	LEFT JOIN wemi2.srv_prezzo_persone_quantita sppq ON spp.id_prezzo_persone = sppq.id_prezzo_persone
	LEFT JOIN wemi2.servizio ON servizio.id_servizio = see.id_servizio_riferimento
	LEFT JOIN wemi2.d_unita_prezzo_servizio ON d_unita_prezzo_servizio.cd_unita_prezzo = servizio.cd_unita_prezzo
	LEFT JOIN LATERAL (
		SELECT 
			COALESCE(AVG(irs.qt_media_singola_recensione), 0) as "mediaRecensioni",
			count(*) as "numeroRecensioni"
		FROM wemi2.recensione_servizio_ente irs
		INNER JOIN wemi2.recensione_servizio_ente_stt istt on istt.id_rich_serv_rec = irs.id_rich_serv_rec
		INNER JOIN wemi2.richiesta_servizio_ente ire on irs.id_rich_serv_rec = ire.id_richiesta_servizio_ente
		WHERE ire.id_servizio_erogato_ente = see.id_servizio_ente
		AND istt.ts_variazione_stato = (
			SELECT MAX(iistt.ts_variazione_stato)
			FROM wemi2.recensione_servizio_ente_stt iistt
			WHERE iistt.id_rich_serv_rec = istt.id_rich_serv_rec
		)
		AND istt.cd_stato_recensione = '3'
  ) as recensioni ON TRUE
WHERE
	id_servizio_riferimento = $[idServizioRiferimento]
	AND stt.ts_variazione_stato = (
		SELECT MAX(istt.ts_variazione_stato)
		FROM wemi2.servizio_erogato_ente_stt istt 
		WHERE istt.id_servizio_ente = see.id_servizio_ente
	)
	AND estt.ts_variazione_stato = (
		SELECT MAX(istt.ts_variazione_stato)
		FROM wemi2.ente_stt istt 
		WHERE istt.id_ente = e.id_ente
	)
	AND stt.cd_stato_dati_servizio_ente = 31
	AND estt.cd_stato_ente = '31'
	AND CURRENT_DATE >= sp.dt_inizio
	AND (CURRENT_DATE <= sp.dt_fine OR sp.dt_fine IS NULL)
	AND see.id_servizio_ente IN ($[services:csv])
`;

export const prezzoCrescente = `
	ORDER BY "prezzoMinimoDaMostrare" ASC, "mediaRecensioni" DESC, trim(e.nm_ente)
`;
export const prezzoDecrescente = `
	ORDER BY "prezzoMinimoDaMostrare" DESC, "mediaRecensioni" DESC, trim(e.nm_ente)
`;
export const recensioneDecrescente = `
	ORDER BY "mediaRecensioni" DESC, "prezzoMinimoDaMostrare" ASC, trim(e.nm_ente)
`;

export const checkCdStatoServizi = `
		AND sp.cd_tipo_servizio_erog in($[cdTipoServizioErogato:csv],3)
`;

export const checkGratuito = `
		AND sp.cd_tipo_offerta_srv in (1, 2)
`;

export const checkPersoneQuantita = `
		AND (
			(sp.cd_tipo_offerta_srv in (1, 2) AND spp.id_prezzo_persone IS NULL)
			OR (
				(
					($[quantitaPersone] BETWEEN spp.qt_persone_da AND spp.qt_persone_a) OR
					(spp.qt_persone_da IS NULL AND spp.qt_persone_a IS NULL)
				) AND
				(
					($[quantitaUnita] BETWEEN sppq.qt_unita_da AND sppq.qt_unita_a) OR
					($[quantitaUnita] >= sppq.qt_unita_da AND sppq.qt_unita_a IS NULL) OR
					($[quantitaUnita] <= sppq.qt_unita_a AND qt_unita_da IS NULL) OR
					(qt_unita_da IS NULL AND sppq.qt_unita_a IS NULL)
				)
		) AND (
			sp.qt_minima_unita <= $[quantitaUnita] OR sp.qt_minima_unita IS NULL)
		)
`;

export const checkPrezzo = `
	AND COALESCE(sppq.valore * $[quantita], 0) <= $[prezzo]
`;

export const checkMansioni = `
		AND (SELECT ARRAY(
			SELECT
				mansione.id_mansione
			FROM
				wemi2.r_mansione_serv_erog_ente mansione
			WHERE
				mansione.id_servizio_ente = see.id_servizio_ente
		)) @> ARRAY[$[mansioni:csv]]
`;

export const checkDestinatari = `
	AND (SELECT ARRAY(
		SELECT
			destinatario.id_destinatario_liv1
		FROM
			wemi2.r_dest_liv1_servizio_erog destinatario
		WHERE
			destinatario.id_servizio_ente = see.id_servizio_ente
	)) @> ARRAY[$[destinatari:csv]]
`;

export const checkFasceOrarie = `
	AND (SELECT ARRAY(
		SELECT
			fascia.cd_fascia_oraria_erog_srv_ente
		FROM
			wemi2.r_fascia_oraria_erog_srv_ente fascia
		WHERE
			fascia.id_servizio_ente = see.id_servizio_ente
	)) @> ARRAY[$[fasceOrarie:csv]]
`;

export const checkMunicipio = `
AND (SELECT ARRAY(
	SELECT
		municipio.cd_municipio_servito
	FROM
		wemi2.r_municipio_servito_serv_ente municipio
	WHERE
		municipio.id_servizio_ente = see.id_servizio_ente
)) @> ARRAY[$[municipio]]
`

//ESTRAZIONE SPAZI WEMI

export const selectSpaziWemi = `
	SELECT
		c.id_contenuto as "id",
		c.tl_testo_1::json->>'it' as "label" 
	FROM
		wemi2.contenuto c
		INNER JOIN wemi2.r_spazio_wemi_ente r ON c.id_contenuto = r.id_spazio_wemi
	WHERE
		r.id_ente = $[idEnte]
`;


//ESTRAZIONE DATI SERVIZIO RIFERIMENTO

export const selectServizioRiferimento = `
	SELECT
		contenuto.tl_testo_1::json->>'it' as "serviceName",
		dominio.tl_testo_aggettivo::json->>'it' as "tipologiaAggettivo",
		dominio.tl_testo_sostantivo::json->>'it' as "tipologiaSostantivo",
		dominio.fg_genere as "fgGenereMaschile",
		servizio.cd_unita_prezzo as "cdUnitaPrezzo"
	FROM
		wemi2.contenuto contenuto
		inner join wemi2.servizio servizio on contenuto.id_contenuto = servizio.id_servizio
		inner join wemi2.d_unita_prezzo_servizio dominio on servizio.cd_unita_prezzo = dominio.cd_unita_prezzo
	WHERE
		contenuto.id_contenuto = $[idServizioRiferimento]
`;

//SEZIONE QUERY ESTRAZIONE FILTRI

export const selectMinPersoneQuantita = `
	SELECT
		coalesce (spp.qt_persone_da, 1) as "numeroMinimoPersone",
		greatest(coalesce (sppq.qt_unita_da , 1), sp.qt_minima_unita) as "numeroMinimoUnita",
		min(coalesce(spp.qt_persone_da, 1)) over() as "limiteMinimoPersoneAssoluto",
		max(coalesce(spp.qt_persone_a, 999999)) over() as "limiteMassimoPersoneAssoluto"
	FROM
		wemi2.servizio_erogato_ente see
		INNER JOIN wemi2.servizio_erogato_ente_stt stt ON stt.id_servizio_ente = see.id_servizio_ente
		INNER JOIN wemi2.ente_stt estt ON estt.id_ente = see.id_ente_erogatore
		INNER JOIN wemi2.srv_prezzo sp ON sp.id_servizio_ente = see.id_servizio_ente
		LEFT JOIN wemi2.srv_prezzo_persone spp ON spp.id_prezzo = sp.id_prezzo
		LEFT JOIN wemi2.srv_prezzo_persone_quantita sppq ON spp.id_prezzo_persone = sppq.id_prezzo_persone
	WHERE
		id_servizio_riferimento = $[idServizioRiferimento]
		AND stt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.servizio_erogato_ente_stt istt
			WHERE istt.id_servizio_ente = see.id_servizio_ente
		)
		AND estt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.ente_stt istt
			WHERE istt.id_ente = see.id_ente_erogatore
		)
		AND stt.cd_stato_dati_servizio_ente = 31
		AND estt.cd_stato_ente = '31'
		AND CURRENT_DATE >= sp.dt_inizio
		AND (CURRENT_DATE <= sp.dt_fine OR sp.dt_fine IS NULL)
	order by 1,2
	fetch first 1 rows only
`;

export const selectPrezzoMaxMin = (where = '') => `
	SELECT
		MAX(COALESCE(sppq.valore, 0) * $[quantita]) as "prezzoMax",
		MIN(
			CASE
				WHEN sp.cd_tipo_offerta_srv in (1,2) THEN 0
				ELSE COALESCE(sppq.valore, 0) * $[quantita]
			END
		) as "prezzoMin"
	FROM
		wemi2.srv_prezzo sp
		INNER JOIN wemi2.servizio_erogato_ente  see ON see.id_servizio_ente = sp.id_servizio_ente
		INNER JOIN wemi2.servizio_erogato_ente_stt stt ON stt.id_servizio_ente = see.id_servizio_ente
		INNER JOIN wemi2.ente_stt estt ON estt.id_ente = see.id_ente_erogatore
		INNER JOIN wemi2.ente e ON e.id_ente = see.id_ente_erogatore
		LEFT JOIN wemi2.srv_prezzo_persone spp ON spp.id_prezzo = sp.id_prezzo
		LEFT JOIN wemi2.srv_prezzo_persone_quantita sppq ON spp.id_prezzo_persone = sppq.id_prezzo_persone
	WHERE
		id_servizio_riferimento = $[idServizioRiferimento] 
		AND stt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.servizio_erogato_ente_stt istt 
			WHERE istt.id_servizio_ente = see.id_servizio_ente
		)
		AND estt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.ente_stt istt 
			WHERE istt.id_ente = see.id_ente_erogatore
		)
	AND stt.cd_stato_dati_servizio_ente = 31
	AND estt.cd_stato_ente = '31'
	AND CURRENT_DATE >= sp.dt_inizio
	AND (CURRENT_DATE <= sp.dt_fine OR sp.dt_fine IS NULL)
	${where}
`;


export const selectDestinatari = `
	SELECT 
		DISTINCT contenuto.tl_testo_1::json->>'it' as "label",
		contenuto.id_contenuto as "id",
		contenuto.nr_ordine_visualizzazione
	FROM
		wemi2.contenuto
		INNER JOIN wemi2.r_dest_liv1_servizio_erog d ON d.id_destinatario_liv1 = contenuto.id_contenuto
		INNER JOIN wemi2.servizio_erogato_ente  se ON se.id_servizio_ente = d.id_servizio_ente
		INNER JOIN wemi2.srv_prezzo prezzo ON se.id_servizio_ente = prezzo.id_servizio_ente
		INNER JOIN wemi2.servizio_erogato_ente_stt stt ON stt.id_servizio_ente = se.id_servizio_ente
		INNER JOIN wemi2.ente_stt estt ON estt.id_ente = se.id_ente_erogatore
	WHERE
		id_servizio_riferimento = $[idServizioRiferimento] 
		AND stt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.servizio_erogato_ente_stt istt 
			WHERE istt.id_servizio_ente = se.id_servizio_ente
		)
		AND estt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.ente_stt istt 
			WHERE istt.id_ente = se.id_ente_erogatore
		)
		AND stt.cd_stato_dati_servizio_ente = 31
		AND estt.cd_stato_ente = '31'
		AND CURRENT_DATE >= prezzo.dt_inizio
		AND (CURRENT_DATE <= prezzo.dt_fine OR prezzo.dt_fine IS NULL)
	ORDER BY contenuto.nr_ordine_visualizzazione;
`;

export const selectFasceOrarie = `
	SELECT 
		DISTINCT f.tl_valore_testuale::json->>'it' as "label",
		f.cd_fascia_oraria as "id",
		f.pg_visualizzazione
	FROM
		wemi2.d_fascia_oraria f
		INNER JOIN wemi2.r_fascia_oraria_erog_srv_ente rf ON rf.cd_fascia_oraria_erog_srv_ente = f.cd_fascia_oraria
		INNER JOIN wemi2.servizio_erogato_ente  se ON se.id_servizio_ente = rf.id_servizio_ente
		INNER JOIN wemi2.srv_prezzo prezzo ON se.id_servizio_ente = prezzo.id_servizio_ente
		INNER JOIN wemi2.servizio_erogato_ente_stt stt ON stt.id_servizio_ente = se.id_servizio_ente
		INNER JOIN wemi2.ente_stt estt ON estt.id_ente = se.id_ente_erogatore
	WHERE
		id_servizio_riferimento = $[idServizioRiferimento] 
		AND stt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.servizio_erogato_ente_stt istt 
			WHERE istt.id_servizio_ente = se.id_servizio_ente
		)
		AND estt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.ente_stt istt 
			WHERE istt.id_ente = se.id_ente_erogatore
		)
		AND stt.cd_stato_dati_servizio_ente = 31
		AND estt.cd_stato_ente = '31'
		AND CURRENT_DATE >= prezzo.dt_inizio
		AND (CURRENT_DATE <= prezzo.dt_fine OR prezzo.dt_fine IS NULL)
	ORDER BY f.pg_visualizzazione;
`;

export const selectMansioni = `
	SELECT 
		DISTINCT contenuto.tl_testo_1::json->>'it' as "label",
		contenuto.id_contenuto as "id",
		contenuto.nr_ordine_visualizzazione
	FROM
		wemi2.contenuto
		INNER JOIN wemi2.r_mansione_serv_erog_ente m on m.id_mansione = contenuto.id_contenuto
		INNER JOIN wemi2.servizio_erogato_ente  se ON se.id_servizio_ente = m.id_servizio_ente
		INNER JOIN wemi2.srv_prezzo prezzo ON se.id_servizio_ente = prezzo.id_servizio_ente
		INNER JOIN wemi2.servizio_erogato_ente_stt stt ON stt.id_servizio_ente = se.id_servizio_ente
		INNER JOIN wemi2.ente_stt estt ON estt.id_ente = se.id_ente_erogatore
	WHERE
		id_servizio_riferimento = $[idServizioRiferimento] 
		AND stt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.servizio_erogato_ente_stt istt 
			WHERE istt.id_servizio_ente = se.id_servizio_ente
		)
		AND estt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.ente_stt istt 
			WHERE istt.id_ente = se.id_ente_erogatore
		)
		AND stt.cd_stato_dati_servizio_ente = 31
		AND estt.cd_stato_ente = '31'
		AND CURRENT_DATE >= prezzo.dt_inizio
		AND (CURRENT_DATE <= prezzo.dt_fine OR prezzo.dt_fine IS NULL)
	ORDER BY contenuto.nr_ordine_visualizzazione;
`;

export const selectCdTipoServizio = `
	SELECT 
			DISTINCT prezzo.cd_tipo_servizio_erog as codice
	FROM
		wemi2.srv_prezzo prezzo
		INNER JOIN wemi2.servizio_erogato_ente se ON se.id_servizio_ente = prezzo.id_servizio_ente
		INNER JOIN wemi2.servizio_erogato_ente_stt stt ON stt.id_servizio_ente = se.id_servizio_ente
		INNER JOIN wemi2.ente_stt estt ON estt.id_ente = se.id_ente_erogatore
	WHERE
		id_servizio_riferimento = $[idServizioRiferimento] 
		AND stt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.servizio_erogato_ente_stt istt 
			WHERE istt.id_servizio_ente = se.id_servizio_ente
		)
		AND estt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.ente_stt istt 
			WHERE istt.id_ente = se.id_ente_erogatore
		)
		AND stt.cd_stato_dati_servizio_ente = 31
		AND estt.cd_stato_ente = '31'
		AND CURRENT_DATE >= prezzo.dt_inizio
		AND (CURRENT_DATE <= prezzo.dt_fine OR prezzo.dt_fine IS NULL)
`;

export const selectCdTipoOfferta = `
	SELECT 
			DISTINCT prezzo.cd_tipo_offerta_srv as codice
	FROM
		wemi2.srv_prezzo prezzo
		INNER JOIN wemi2.servizio_erogato_ente se ON se.id_servizio_ente = prezzo.id_servizio_ente
		INNER JOIN wemi2.servizio_erogato_ente_stt stt ON stt.id_servizio_ente = se.id_servizio_ente
		INNER JOIN wemi2.ente_stt estt ON estt.id_ente = se.id_ente_erogatore
	WHERE
		id_servizio_riferimento = $[idServizioRiferimento] 
		AND stt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.servizio_erogato_ente_stt istt 
			WHERE istt.id_servizio_ente = se.id_servizio_ente
		)
		AND estt.ts_variazione_stato = (
			SELECT MAX(istt.ts_variazione_stato)
			FROM wemi2.ente_stt istt 
			WHERE istt.id_ente = se.id_ente_erogatore
		)
		AND stt.cd_stato_dati_servizio_ente = 31
		AND estt.cd_stato_ente = '31'
		AND CURRENT_DATE >= prezzo.dt_inizio
		AND (CURRENT_DATE <= prezzo.dt_fine OR prezzo.dt_fine IS NULL)
`;
