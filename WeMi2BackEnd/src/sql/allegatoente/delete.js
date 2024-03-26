export const eliminaAllegatoEnteByIdSql = `
DELETE FROM wemi2.allegato_ente
WHERE id_ente = $[id_ente]
AND id_media = $[id_media];
`;
