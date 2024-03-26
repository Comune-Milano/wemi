import tabelle from 'tabelle';

export const estraiDati008 = `
SELECT  ${tabelle.val_attributo_domanda}.cd_attributo,
cd_val_attributo,tx_val,
dt_val :: timestamp with time zone,
tx_nota,
tx_nota_op,
nr_val,
fg_val,
fg_mansione_svolta
FROM ${tabelle.val_attributo_domanda}
WHERE id_richiesta_servizio_tcb = $[idRichiestaTcb] 
and ${tabelle.val_attributo_domanda}.cd_attributo IN ($[arrayConfig:csv])
`;