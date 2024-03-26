export const deleteQualifiche =
  ` DELETE FROM wemi2.r_qual_pers_serv_erog_ente
    WHERE id_servizio_ente = $[idServizioEnte] AND ty_personale_rif= $[personaleRif] `;