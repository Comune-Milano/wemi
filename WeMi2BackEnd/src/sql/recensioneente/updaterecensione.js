export const updateRecensione = `
  UPDATE wemi2.recensione_servizio_ente
  SET cd_stato_rec = 1
  WHERE id_rich_serv_rec = $[idRichiesta];
`;