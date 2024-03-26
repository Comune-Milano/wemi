export const deleteListinoPrezzi = `
  DELETE FROM wemi2.srv_prezzo_persone_quantita sppq
  USING 
    wemi2.srv_prezzo_persone spp, wemi2.srv_prezzo sp
  WHERE
    sp.id_prezzo = spp.id_prezzo
    AND
    spp.id_prezzo_persone = sppq.id_prezzo_persone
    AND
    sp.id_servizio_ente = $[idServizioEnte];
  
    DELETE FROM wemi2.srv_prezzo_persone spp
    USING
      wemi2.srv_prezzo sp
    WHERE
      sp.id_prezzo = spp.id_prezzo
      AND
      sp.id_servizio_ente = $[idServizioEnte];

`;