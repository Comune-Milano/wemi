export const eliminaMediaEnteSql = `
DELETE FROM wemi2.media
WHERE id_media = $[id_media];
`;

export const eliminaMediaSql = `
DELETE 
FROM wemi2.media as medialogo
WHERE medialogo.id_media = $[idMedia]
`;