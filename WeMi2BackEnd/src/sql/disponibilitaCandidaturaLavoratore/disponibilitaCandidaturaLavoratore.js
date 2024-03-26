import { attributo } from 'constants/db/attributo';
import { dominioTcb } from 'constants/db/dominio_tcb';
import { 
  deleteFromOffertaServizioByIdServizioAndCodiceAttributo, 
  deleteTipologiaOrarioFromOffertaServizio, 
} from 'sql/valattributooffertaservizio/delete';
import { 
  deleteFromAttributoCalendarioOffertaServizioByIdServizioAndCodiceValoreAttributo, 
} from 'sql/valattributocaloffservlav/delete';

export const estraiDatiDisponibilitaCandidaturaLavoratoreSql = context => {
  let sql = '';

  //Orario di lavoro
  sql += datiCandidaturaSql(
    context,
    attributo.LS_ORARIO_LAVORO.ty_dominio_tcb,
    attributo.LS_ORARIO_LAVORO.cd_attributo
  );

  //CONVIVENZA

  //Mezza giornata di riposo
  sql += datiCandidaturaSql(
    context,
    attributo.LS_MEZZA_GIORNATA_CONVIVENTE.ty_dominio_tcb,
    attributo.LS_MEZZA_GIORNATA_CONVIVENTE.cd_attributo
  );

  //Stipendio proposto
  sql += datiCandidaturaSql(
    context,
    attributo.LS_STIPENDIO_CONVIVENTE.ty_dominio_tcb,
    attributo.LS_STIPENDIO_CONVIVENTE.cd_attributo
  );

  //Spazi accettabili
  sql += datiCandidaturaSql(
    context,
    attributo.LS_SPAZI_CONVIVENTE.ty_dominio_tcb,
    attributo.LS_SPAZI_CONVIVENTE.cd_attributo
  );

  //Testo spazio accettabile altro
  sql += estraiTestoTipologiaSpazioAltroSql(
    context,
    attributo.LS_SPAZI_CONVIVENTE.cd_attributo
  );

  //CONVIVENZA RIDOTTA

  //Stipendio proposto
  sql += datiCandidaturaSql(
    context,
    attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.ty_dominio_tcb,
    attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.cd_attributo
  );

  //Spazi accettabili
  sql += datiCandidaturaSql(
    context,
    attributo.LS_SPAZI_CONVIVENZA_RIDOTTA.ty_dominio_tcb,
    attributo.LS_SPAZI_CONVIVENZA_RIDOTTA.cd_attributo
  );

  //Testo spazio accettabile altro
  sql += estraiTestoTipologiaSpazioAltroSql(
    context,
    attributo.LS_SPAZI_CONVIVENZA_RIDOTTA.cd_attributo
  );

  //Calendario
  sql += estraiCalendarioDisponibilitaCandidaturaLavoratoreSql(
    context,
    dominioTcb.orarioLavoro.convivenzaRidotta
  );

  //FULL TIME, PART TIME, A ORE

  //Stipendio proposto
  sql += datiCandidaturaSql(
    context,
    attributo.LS_STIPENDIO_NON_CONVIVENTE.ty_dominio_tcb,
    attributo.LS_STIPENDIO_NON_CONVIVENTE.cd_attributo
  );

  //Calendario
  sql += estraiCalendarioDisponibilitaCandidaturaLavoratoreSql(
    context,
    dominioTcb.orarioLavoro.fullTimePartTimeAdOre
  );

  //ASSISTENZA NOTTURNA

  //Stipendio proposto
  sql += datiCandidaturaSql(
    context,
    attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.ty_dominio_tcb,
    attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.cd_attributo
  );

  //Calendario
  sql += estraiCalendarioDisponibilitaCandidaturaLavoratoreSql(
    context,
    dominioTcb.orarioLavoro.assistenzaNotturna
  );

  //WEEK-END

  //Stipendio proposto
  sql += datiCandidaturaSql(
    context,
    attributo.LS_STIPENDIO_WEEKEND.ty_dominio_tcb,
    attributo.LS_STIPENDIO_WEEKEND.cd_attributo
  );

   //Calendario

  sql += estraiCalendarioDisponibilitaCandidaturaLavoratoreSql(
    context,
    dominioTcb.orarioLavoro.weekend
  );

  //Numero ore settimanali disponibilità
  sql += datiCandidaturaSql(
    context,
    attributo.LS_FASCE_ORE_SETTIMANALI.ty_dominio_tcb,
    attributo.LS_FASCE_ORE_SETTIMANALI.cd_attributo
  );

  //Tipologia contratto
  sql += datiCandidaturaSql(
    context,
    attributo.LS_TIPOLOGIA_CONTRATTO.ty_dominio_tcb,
    attributo.LS_TIPOLOGIA_CONTRATTO.cd_attributo
  );

  //Disponibilità brevi trasferte
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_TRASFERTE_BREVI);

  //Disponibilità trasferte lunghe
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_TRASFERTE_LUNGHE);

  //Disponibilità ad andare in vacanze con la famiglia
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISPONIBILITA_VACANZA_CON_FAMIGLIA);

  //Disponibilità ad andare in vacanza solo con assistito
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISPONIBILITA_VACANZA_SOLO_CON_ASSISTITO);

  //Disponibilità a fare straordinari
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISPONIBILITA_STRAORDINARI);

  //Disponibilità a lavorare a casa con animali
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_LAV_CASA_CON_ANIMALI);

  //Disponibilità a prendersi cura degli animali
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_CURA_ANIMALI);

  //Disponibilità a lavorare in casa di famiglie numerose
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_FAMIGLIE_NUMEROSE);

  //Disponibilità in relazione alla grandezza della casa
  sql += datiCandidaturaSql(
    context,
    attributo.LS_DISPONIBILITA_SUPERFICI_CASA.ty_dominio_tcb,
    attributo.LS_DISPONIBILITA_SUPERFICI_CASA.cd_attributo
  );

  //Disponibilità ad accudire persone con patologie
  sql += datiCandidaturaSql(
    context,
    attributo.LS_PATOLOGIE_DISP_ACCUDIMENTO.ty_dominio_tcb,
    attributo.LS_PATOLOGIE_DISP_ACCUDIMENTO.cd_attributo
  );

  //Sede di lavoro
  sql += datiMunicipiSql(context);

  //Disponibilità a lavorare fuori Milano
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_LAV_FUORI_MILANO);

  //Disponibilità ad effettuare sostituzioni brevi
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_SOST_BREVI);

  //Disponibilità ad effettuare sostituzioni lunghe
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_SOST_LUNGHE);

  return sql;
};

export const estraiDatiDisponibilitaCandidaturaLavoratoreBadanteSql = (context) => {
  let sql = '';

  //PRESENZA NOTTURNA

  //Stipendio proposto
  sql += datiCandidaturaSql(
    context,
    attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.ty_dominio_tcb,
    attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.cd_attributo
  );

  //Calendario
  sql += estraiCalendarioDisponibilitaCandidaturaLavoratoreSql(
    context,
    dominioTcb.orarioLavoro.presenzaNotturna
  );

  //Preferenze genere assistito
  sql += datiCandidaturaSql(
    context,
    attributo.CD_RIC_SESSO_ASSISTITO.ty_dominio_tcb,
    attributo.CD_RIC_SESSO_ASSISTITO.cd_attributo
  );

  //Disponibilità a svegliarsi di notte
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_SVEGLIARSI_NOTTE);

  //Disponibilità ad occuparsi di persone anziane che vivono in famiglia
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_LAV_PERS_ANZIANA_FAMIGLIA);

  //Disponibilità ad occuparsi di coppie di anziani
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_LAV_COPPIE_ANZ);

  return sql;
};

export const estraiDatiDisponibilitaCandidaturaLavoratoreTataSql = (context) => {
  let sql = '';

  //PRESENZA NOTTURNA

  //Stipendio proposto
  sql += datiCandidaturaSql(
    context,
    attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.ty_dominio_tcb,
    attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.cd_attributo
  );

  //Calendario
  sql += estraiCalendarioDisponibilitaCandidaturaLavoratoreSql(
    context,
    dominioTcb.orarioLavoro.presenzaNotturna
  );

  //Preferenze genere assistito
  sql += datiCandidaturaSql(
    context,
    attributo.CD_RIC_SESSO_ASSISTITO.ty_dominio_tcb,
    attributo.CD_RIC_SESSO_ASSISTITO.cd_attributo
  );

  //Disponibilità a svegliarsi di notte
  sql += estraiFlagDisponibilitaSql(context, attributo.FG_DISP_SVEGLIARSI_NOTTE);

  //Bambini da accudire
  //Numero massimo
  sql += estraiNumeroMassimoBambiniDaAccudireSql(context);
  //Fasce eta
  sql += datiCandidaturaSql(
    context,
    attributo.LS_FASCIA_ETA_BAMBINI.ty_dominio_tcb,
    attributo.LS_FASCIA_ETA_BAMBINI.cd_attributo
  );

  return sql;
};

const datiCandidaturaSql = (context, tyDominioTcb, codiceAttributo) => {
  const sql = ` WITH tableCandidatura AS (
    (SELECT
    vaos.cd_val_attributo::INTEGER AS "id",
    true AS "checked",
    dtcb.tl_valore_testuale #>> $[input.locale] as "value",
    dtcb.pg_visualizzazione
    FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
    INNER JOIN ${context.tabelle.dominio_tcb} dtcb ON vaos.cd_val_attributo = dtcb.cd_dominio_tcb 
      AND ty_dominio_tcb = ${tyDominioTcb}
    WHERE id_utente_lav = $[input.idLavoratore]
    AND id_servizio_riferimento = $[input.idServizioRiferimento]
    AND cd_attributo = ${codiceAttributo}
    order by dtcb.pg_visualizzazione asc)
    UNION ALL
    (SELECT 
    cd_dominio_tcb::INTEGER AS "id",
    false AS "checked",
    dtcb.tl_valore_testuale #>> $[input.locale] AS "value",
    dtcb.pg_visualizzazione
    FROM ${context.tabelle.dominio_tcb} dtcb
    WHERE ty_dominio_tcb = ${tyDominioTcb}
    AND NOT EXISTS (
      SELECT cd_val_attributo AS "codiceAttributo"
      FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
      WHERE dtcb.cd_dominio_tcb = vaos.cd_val_attributo
      AND id_utente_lav = $[input.idLavoratore]
      AND id_servizio_riferimento = $[input.idServizioRiferimento]
      AND cd_attributo = ${codiceAttributo}
    )
    order by dtcb.pg_visualizzazione asc
  )
  )
  SELECT * FROM tableCandidatura ORDER BY pg_visualizzazione;
  `;

  return sql;
};

const datiMunicipiSql = (context) => {
  const sql = `
  (SELECT
  vaos.cd_val_attributo::INTEGER AS "id",
  true AS "checked",
  mun.tl_valore_testuale #>> $[input.locale] as "value",
  mun.pg_visualizzazione
  FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
  INNER JOIN ${context.tabelle.d_municipio} mun ON vaos.cd_val_attributo = mun.cd_municipio 
  WHERE id_utente_lav = $[input.idLavoratore]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = ${attributo.LS_MUNICIPI_RIF_DISPONIBILITA}
  ORDER BY mun.pg_visualizzazione asc)
  UNION ALL
  (SELECT 
  cd_municipio::INTEGER AS "id",
  false AS "checked",
  mun.tl_valore_testuale #>> $[input.locale] AS "value",
  mun.pg_visualizzazione
  FROM ${context.tabelle.d_municipio} mun
  WHERE NOT EXISTS (
    SELECT cd_val_attributo AS "codiceAttributo"
    FROM ${context.tabelle.val_attributo_offerta_servizio} vaos
    WHERE mun.cd_municipio = vaos.cd_val_attributo
    AND id_utente_lav = $[input.idLavoratore]
    AND id_servizio_riferimento = $[input.idServizioRiferimento]
    AND cd_attributo = ${attributo.LS_MUNICIPI_RIF_DISPONIBILITA}
  )
  ORDER BY mun.pg_visualizzazione asc);
`;

  return sql;
};

const estraiCalendarioDisponibilitaCandidaturaLavoratoreSql = (context, codiceValAttributoOrario) => {
  const sql = `
  SELECT 
  tx_lunedi as "Lunedì",
  tx_martedi as "Martedì",
  tx_mercoledi as "Mercoledì",
  tx_giovedi as "Giovedì",
  tx_venerdi as "Venerdì",
  tx_sabato as "Sabato",
  tx_domenica as "Domenica"
  FROM ${context.tabelle.val_attributo_cal_off_serv_lav}
  WHERE id_utente_lav = $[input.idLavoratore]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo_orario_lav = ${attributo.LS_ORARIO_LAVORO.cd_attributo}
  AND cd_val_attributo_orario_lav = ${codiceValAttributoOrario}
  UNION ALL
	SELECT
  null as "Lunedì",
	null as "Martedì",
	null as "Mercoledì",
	null as "Giovedì",
	null as "Venerdì",
	null as "Sabato",
	null as "Domenica"
	WHERE NOT EXISTS (
    SELECT 1
    FROM ${context.tabelle.val_attributo_cal_off_serv_lav}
    WHERE id_utente_lav = $[input.idLavoratore]
    AND id_servizio_riferimento = $[input.idServizioRiferimento]
    AND cd_attributo_orario_lav = ${ attributo.LS_ORARIO_LAVORO.cd_attributo}
    AND cd_val_attributo_orario_lav = ${codiceValAttributoOrario}
	);
  `;

  return sql;
};

const estraiTestoTipologiaSpazioAltroSql = (context, codiceAttributo) => {
  const sql = `
  SELECT tx_val as "testoAltro"
  FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[input.idLavoratore]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = ${codiceAttributo}
  AND cd_val_attributo = 0;
  `;

  return sql;
};

const estraiFlagDisponibilitaSql = (context, codiceAttributo) => {
  const sql = `
  SELECT
  CASE 
    WHEN fg_val IS NULL OR fg_val = 'N' THEN false
		WHEN fg_val = 'S' THEN true
	END AS "checked",
	tx_nota as "nota"
	FROM ${context.tabelle.val_attributo_offerta_servizio}
	WHERE id_utente_lav = $[input.idLavoratore]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = ${codiceAttributo}
  AND cd_val_attributo = 1
	UNION ALL
	SELECT
	false as "checked",
	null as "nota"
	WHERE NOT EXISTS (
    SELECT 1
		FROM ${context.tabelle.val_attributo_offerta_servizio}
		WHERE id_utente_lav = $[input.idLavoratore]
    AND id_servizio_riferimento = $[input.idServizioRiferimento]
    AND cd_attributo = ${codiceAttributo}
    AND cd_val_attributo = 1
	);
  `;

  return sql;
};

const estraiNumeroMassimoBambiniDaAccudireSql = (context) => { 
  const sql = `
  SELECT nr_val as "nrMax"
  FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[input.idLavoratore]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = ${attributo.NR_MAX_BAMBINI}
  AND cd_val_attributo = 1;
  `;

  return sql;
};

export const verificaTipologieOrarioLavoratoreSql = (context, tipologieOrario) => {
  const sql = `
  SELECT cd_val_attributo::INTEGER as "codiceAttributo"
  FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[input.idLavoratore]
  AND cd_attributo = ${attributo.LS_ORARIO_LAVORO.cd_attributo}
  AND cd_val_attributo IN (${tipologieOrario.join(',')})
  AND id_servizio_riferimento = $[input.idServizioRiferimento];
  `;

  return sql;
};

export const eliminaAttributiSql = (context, codiceAttributo) => {
  const sql = `
  DELETE FROM ${context.tabelle.val_attributo_offerta_servizio}
  WHERE id_utente_lav = $[input.idLavoratore]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo = ${codiceAttributo};
  `;

  return sql;
};

export const verificaCompetenzeTataSql = `
  SELECT *
  FROM wemi2.utente_offerta_servizio
  WHERE id_servizio_riferimento = $[input.idServizioRiferimento] AND id_utente_lav = $[input.idLavoratore];
  `;

export const verificaCalendarioSql = (context, tipologiaOrario) => {
  const sql = `
  SELECT 1
  FROM ${context.tabelle.val_attributo_cal_off_serv_lav}
  WHERE id_utente_lav = $[input.idLavoratore]
  AND id_servizio_riferimento = $[input.idServizioRiferimento]
  AND cd_attributo_orario_lav = ${attributo.LS_ORARIO_LAVORO.cd_attributo}
  AND cd_val_attributo_orario_lav = ${tipologiaOrario};
  `;

  return sql;
};

export const eliminaCandidaturaTipologiaOrarioConvivenzaSql = () => {
  let sql = deleteTipologiaOrarioFromOffertaServizio(dominioTcb.orarioLavoro.convivenza);

  sql += deleteFromOffertaServizioByIdServizioAndCodiceAttributo(attributo.LS_MEZZA_GIORNATA_CONVIVENTE.cd_attributo);

  sql += deleteFromOffertaServizioByIdServizioAndCodiceAttributo(attributo.LS_STIPENDIO_CONVIVENTE.cd_attributo);

  sql += deleteFromOffertaServizioByIdServizioAndCodiceAttributo(attributo.LS_SPAZI_CONVIVENTE.cd_attributo);

  return sql;
};

export const eliminaCandidaturaTipologiaOrarioConvivenzaRidottaSql = () => {
  let sql = deleteFromAttributoCalendarioOffertaServizioByIdServizioAndCodiceValoreAttributo(dominioTcb.orarioLavoro.convivenzaRidotta);
  
  sql += deleteTipologiaOrarioFromOffertaServizio(dominioTcb.orarioLavoro.convivenzaRidotta);

  sql += deleteFromOffertaServizioByIdServizioAndCodiceAttributo(attributo.LS_STIPENDIO_A_CONVIVENZA_RIDOTTA.cd_attributo);

  sql += deleteFromOffertaServizioByIdServizioAndCodiceAttributo(attributo.LS_SPAZI_CONVIVENZA_RIDOTTA.cd_attributo);

  return sql;
};

export const eliminaCandidaturaTipologiaOrarioFullTimePartTimeAdOreSql = () => {
  let sql = deleteFromAttributoCalendarioOffertaServizioByIdServizioAndCodiceValoreAttributo(dominioTcb.orarioLavoro.fullTimePartTimeAdOre);
  
  sql += deleteTipologiaOrarioFromOffertaServizio(dominioTcb.orarioLavoro.fullTimePartTimeAdOre);

  sql += deleteFromOffertaServizioByIdServizioAndCodiceAttributo(attributo.LS_STIPENDIO_NON_CONVIVENTE.cd_attributo);

  return sql;
};

export const eliminaCandidaturaTipologiaOrarioAssistenzaNotturnaSql = () => {
  let sql = deleteFromAttributoCalendarioOffertaServizioByIdServizioAndCodiceValoreAttributo(dominioTcb.orarioLavoro.assistenzaNotturna);
  
  sql += deleteTipologiaOrarioFromOffertaServizio(dominioTcb.orarioLavoro.assistenzaNotturna);

  sql += deleteFromOffertaServizioByIdServizioAndCodiceAttributo(attributo.LS_STIPENDIO_ASSISTENZA_NOTTURNA.cd_attributo);

  return sql;
};

export const eliminaCandidaturaTipologiaOrarioWeekendSql = () => {
  let sql = deleteFromAttributoCalendarioOffertaServizioByIdServizioAndCodiceValoreAttributo(dominioTcb.orarioLavoro.weekend);
  
  sql += deleteTipologiaOrarioFromOffertaServizio(dominioTcb.orarioLavoro.weekend);


  sql += deleteFromOffertaServizioByIdServizioAndCodiceAttributo(attributo.LS_STIPENDIO_WEEKEND.cd_attributo);

  return sql;
};

export const eliminaCandidaturaTipologiaOrarioPresenzaNotturnaSql = () => {
  let sql = deleteFromAttributoCalendarioOffertaServizioByIdServizioAndCodiceValoreAttributo(dominioTcb.orarioLavoro.presenzaNotturna);
  
  sql += deleteTipologiaOrarioFromOffertaServizio(dominioTcb.orarioLavoro.presenzaNotturna);

  sql += deleteFromOffertaServizioByIdServizioAndCodiceAttributo(attributo.LS_STIPENDIO_PRESENZA_NOTTURNA.cd_attributo);

  return sql;
};