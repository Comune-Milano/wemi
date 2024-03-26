import tabelle from 'tabelle';

export const deleteForEliminaBen =  `DELETE FROM ${tabelle.val_attributo_rel_dom_serv_lav}
  WHERE id_richiesta_servizio_tcb =$[idRichiestaTcb] AND
    pg_beneficiario_richiesta_tcb = $[pgBen];`