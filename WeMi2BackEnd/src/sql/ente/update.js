export const updateMerchant = `
  UPDATE wemi2.merchant  
  SET
    id_merchant = $[merchantId],
    id_public_key = $[publicKey],
    id_private_key = $[privateKey],
    dt_inizio_val = $[dataInizio],
    dt_fine_val = $[dataFine]
  WHERE id_ente = $[idEnte]
`;