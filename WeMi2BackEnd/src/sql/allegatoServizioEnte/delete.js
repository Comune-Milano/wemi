
export const deleteAllegatoServizioEnte = `
  DELETE FROM wemi2.allegato_servizio_ente
  WHERE id_media = $[idMedia]; 
`;