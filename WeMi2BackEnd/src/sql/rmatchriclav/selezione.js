export const findStatoRichiestaCandidatura = `SELECT id_richiesta as "idRichiesta", cd_stato_chat as "cdStatoChat" 
FROM wemi2.r_match_ric_lav
INNER JOIN wemi2.richiesta_servizio_ente_stt ON id_richiesta_servizio_ente = id_richiesta 
WHERE id_lavoratore = $[idLavoratore]
`;

export const findIdRichiestaByLavoratore = `SELECT id_richiesta as "idRichiesta" FROM wemi2.r_match_ric_lav WHERE id_lavoratore = $[idLavoratore]`;

export const countStatoAssociazione = `
SELECT CAST( COUNT(DISTINCT rmrl.id_richiesta) AS Int)
FROM wemi2.r_match_ric_lav as rmrl
INNER JOIN wemi2.richiesta_servizio_ente_stt as rses ON
rmrl.id_richiesta = rses.id_richiesta_servizio_ente
WHERE CAST(rses.cd_stato_ric_serv_ente AS Int) <> 9 and rmrl.id_lavoratore = $[idUtenteLav];
`;

export const findRichiestaAssociazione = `SELECT id_richiesta as "idRichiesta" 
FROM wemi2.r_match_ric_lav 
WHERE id_lavoratore = $[idLavoratore] and id_richiesta = $[idRichiesta]`;
