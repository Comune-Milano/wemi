import tabelle from 'tabelle';

export const insertValAttributoRelDomServLav =  `
INSERT INTO ${tabelle.val_attributo_rel_dom_serv_lav}(
   id_richiesta_servizio_tcb, 
   cd_attributo_1, 
   cd_val_attributo_1, 
   cd_attributo_2,
   cd_val_attributo_2,
   pg_beneficiario_richiesta_tcb
   )
    VALUES (
               $[idRichiestaTcb], 
               $[val.cd_attributo],
               $[val.cd_val_attributo],
               $[ben.attributo_2.cd_attributo],
               $[ben.attributo_2.cd_val_attributo],
               $[ben.pgBen]
              );
    `
;