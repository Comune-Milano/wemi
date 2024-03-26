export const deleteSediErogatrici = `
DELETE FROM
  wemi2.r_sede_ente_servizio_erog
WHERE
  id_sede_erogazione_srv IN ($1:csv)
  AND id_servizio_ente = $2
`;