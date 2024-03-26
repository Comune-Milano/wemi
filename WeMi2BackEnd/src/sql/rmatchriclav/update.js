export const updateStatoAssociazioneLavoratore = `
UPDATE wemi2.r_match_ric_lav
SET ts_ultima_modifica=localtimestamp,
cd_stato_associazione=$[statoAssociazione],
tx_nota=null
WHERE id_lavoratore =$[idLavoratore] and id_richiesta = $[idRichiesta]
`;

export const updateStatoAssociazioneLavoratoreByRichiesta = `
UPDATE wemi2.r_match_ric_lav
SET ts_ultima_modifica=localtimestamp,
cd_stato_associazione=$[statoAssociazione]
WHERE id_richiesta = $[idRichiesta] and id_lavoratore <> $[idLavoratore]
`;