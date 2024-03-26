export const aggiornaLogoDatiPropriEnteSql = `
UPDATE wemi2.dati_propri_ente
SET id_img_logo = $[id_media]
WHERE id_ente_rif = $[id_ente]
`;
