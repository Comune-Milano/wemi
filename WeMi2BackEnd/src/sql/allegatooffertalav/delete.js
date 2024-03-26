/**
* It deletes the attributes associated to the idLavoratore from allegato_offerta_lav
*/
export const deleteFromAllegatoOfferta = `DELETE FROM wemi2.allegato_offerta_lav WHERE id_utente_lav = $[idLavoratore]`;

export const deleteFromAllegatoRichiesta = `DELETE FROM wemi2.allegato_richiesta WHERE id_lavoratore = $[idLavoratore] and id_richiesta = $[idRichiesta]`;
export const eliminaCv = `
DELETE 
FROM wemi2.allegato_offerta_lav
WHERE id_utente_lav = $[idLavoratore] and nm_nome_allegato_off= $[nomeAllegato] ;
`;
