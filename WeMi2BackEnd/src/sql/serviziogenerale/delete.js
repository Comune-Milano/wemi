export const deleteTags = `
DELETE FROM
  wemi2.servizio_tag
WHERE
  tx_tag_ricerca IN ($1:csv)
  AND id_servizio = $2
`;
