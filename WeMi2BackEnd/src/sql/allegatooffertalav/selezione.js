export const findAllegatoByIdLavoratore = `
SELECT * 
FROM wemi2.allegato_offerta_lav
WHERE id_utente_lav = $[idLavoratore]
;
`;