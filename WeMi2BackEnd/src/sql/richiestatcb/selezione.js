import { STATO_RICHIESTA_INOLTRATA } from "constants/db/stato_richiesta_tcb";
import { attributo, defaultValueCalendar } from "constants/db/attributo";

export const findUserByIdRequest = `
SELECT id_utente_richiedente, richiesta_servizio_base.id_richiesta_servizio_base, cd_stato_chat
FROM wemi2.richiesta_servizio_ente
INNER JOIN richiesta_servizio_base ON richiesta_servizio_base.id_richiesta_servizio_base = richiesta_servizio_ente.id_richiesta_servizio_base
INNER JOIN richiesta_servizio_ente_stt ON richiesta_servizio_ente_stt.id_richiesta_servizio_ente = richiesta_servizio_ente.id_richiesta_servizio_ente
WHERE richiesta_servizio_ente.id_richiesta_servizio_ente = $[id_richiesta_servizio_ente] and richiesta_servizio_ente_stt.ts_variazione_stato = (
  SELECT MAX(richiesta_servizio_ente_stt.ts_variazione_stato)
  FROM wemi2.richiesta_servizio_ente_stt
  WHERE id_richiesta_servizio_ente = richiesta_servizio_ente.id_richiesta_servizio_ente
  )
`;

export const findServiceByIdRequestSql = `
SELECT serv.*
FROM richiesta_servizio_ente rse
INNER JOIN servizio_erogato_ente as see on rse.id_servizio_erogato_ente = see.id_servizio_ente
INNER JOIN servizio as serv on see.id_servizio_riferimento = serv.id_servizio
WHERE rse.id_richiesta_servizio_ente = $[id_richiesta_servizio_ente]
`;


export const findInfoRequestTCB = `
select 
--dati del calendario
json_build_array(
  json_build_object('dayId', 1, 'txValue', 'Lunedì','hoursBin', COALESCE(tcb.tx_lunedi_cal_disp, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 2, 'txValue', 'Martedì','hoursBin', COALESCE(tcb.tx_martedi_acl_disp, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 3, 'txValue', 'Mercoledì','hoursBin', COALESCE(tcb.tx_mercoledi_cal_disp, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 4, 'txValue', 'Giovedì','hoursBin', COALESCE(tcb.tx_giovedi_cal_disp, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 5, 'txValue', 'Venerdì','hoursBin', COALESCE(tcb.tx_venerdi_cal_disp, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 6, 'txValue', 'Sabato','hoursBin', COALESCE(tcb.tx_sabato_cal_disp, '${defaultValueCalendar}'), 'count', 0),
  json_build_object('dayId', 7, 'txValue', 'Domenica','hoursBin', COALESCE(tcb.tx_domenica_cal_disp, '${defaultValueCalendar}'), 'count', 0)
  ) as "calendario",
--dati del calendario
tcb.id_richiesta_servizio_tcb as "idRichiesta",
richiesta_servizio_ente.id_richiesta_servizio_base as "idRichiestaBase",
COALESCE(vadNome.tx_val, '') as "nomeUtente",
COALESCE(vadCognome.tx_val, '') as "cognomeUtente",
tcb.ts_ult_modifica as "dataRichiesta",
tcb.ts_creazione as "dataCreazione",
vad.cd_val_attributo as "idTipologiaOrario",
dtcbTipologia.tl_valore_testuale ->> 'it' as "tipoRichiesta",
id_servizio_ente as "idServizio",
dtcbStatoDomanda.tl_valore_testuale ->> 'it' as "statoRichiesta",
dt_periodo_richiesto_dal::timestamp with time zone as "periodoDal",
dt_periodo_richiesto_al::timestamp with time zone as "periodoAl"
from wemi2.richiesta_servizio_tcb as tcb
INNER JOIN wemi2.richiesta_servizio_ente ON 
richiesta_servizio_ente.id_richiesta_servizio_ente = 
tcb.id_richiesta_servizio_tcb
INNER JOIN wemi2.val_attributo_domanda as vad ON 
tcb.id_richiesta_servizio_tcb = vad.id_richiesta_servizio_tcb and vad.cd_attributo = ${attributo.CD_ORARIO_LAVORO}
INNER JOIN wemi2.val_attributo_domanda as vadNome ON
tcb.id_richiesta_servizio_tcb = vadNome.id_richiesta_servizio_tcb and vadNome.cd_attributo = ${attributo.TX_NOME_CONTATTO}
INNER JOIN wemi2.val_attributo_domanda as vadCognome ON
tcb.id_richiesta_servizio_tcb = vadCognome.id_richiesta_servizio_tcb and vadCognome.cd_attributo = ${attributo.TX_COGNOME_CONTATTO}
INNER JOIN wemi2.richiesta_servizio_base ON 
richiesta_servizio_base.id_richiesta_servizio_base = 
richiesta_servizio_ente.id_richiesta_servizio_base
INNER JOIN wemi2.utente ON utente.id_utente = richiesta_servizio_base.id_utente_richiedente
INNER JOIN wemi2.servizio_erogato_ente ON servizio_erogato_ente.id_servizio_ente = richiesta_servizio_ente.id_servizio_erogato_ente
INNER JOIN wemi2.richiesta_servizio_ente_stt as entestt ON entestt.id_richiesta_servizio_ente = 
richiesta_servizio_ente.id_richiesta_servizio_ente
INNER JOIN wemi2.dominio_tcb as dtcbStatoDomanda on 
CAST(entestt.cd_stato_ric_serv_ente AS Int) = dtcbStatoDomanda.cd_dominio_tcb and dtcbStatoDomanda.ty_dominio_tcb = 50
INNER JOIN wemi2.dominio_tcb as dtcbTipologia on 
CAST(id_servizio_ente AS Int) = dtcbTipologia.cd_dominio_tcb and 
dtcbTipologia.ty_dominio_tcb = 46
WHERE tcb.id_richiesta_servizio_tcb = $[idRichiestaTcb] 
and entestt.ts_variazione_stato = (
SELECT MAX(ts_variazione_stato)
 FROM wemi2.richiesta_servizio_ente_stt
WHERE id_richiesta_servizio_ente = $[idRichiestaTcb]  
) 
--and CAST(entestt.cd_stato_ric_serv_ente as int) = ${STATO_RICHIESTA_INOLTRATA.codice};
`;
