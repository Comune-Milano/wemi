export const EstraiDescrittoriBenessere = `
  SELECT
    nm_descrittore_movimento,
    nm_descrittore_relazioni,
    nm_descrittore_competenze,
    nm_descrittore_creativita,
    nm_descrittore_autodeterm
  FROM wemi2.servizio_erogato_ente
  WHERE id_servizio_ente = $[idServizioEnte]
`;