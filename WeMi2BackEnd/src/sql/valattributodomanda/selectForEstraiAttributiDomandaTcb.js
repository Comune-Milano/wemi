import tabelle from 'tabelle';

export const selectForEstraiAttributiDomandaTcb =
`
            SELECT 
              val.cd_attributo,
              dom.tl_valore_testuale,
              attr.ty_dominio_tcb,
              val.cd_val_attributo,
              val.tx_val,
              val.dt_val ::timestamp with time zone,
              val.tx_nota,
              val.tx_nota_op,
              val.nr_val,
              val.fg_val,
              val.fg_mansione_svolta
            FROM ${tabelle.val_attributo_domanda} val
                LEFT JOIN ${tabelle.attributo} attr on (attr.cd_attributo = val.cd_attributo)
                LEFT JOIN ${tabelle.dominio_tcb} dom on (attr.ty_dominio_tcb = dom.ty_dominio_tcb and val.cd_val_attributo = dom.cd_dominio_tcb)
            WHERE val.id_richiesta_servizio_tcb = $[idRichiestaTcb] AND 
                val.cd_attributo IN ($[arrayConfig:csv])
        `;