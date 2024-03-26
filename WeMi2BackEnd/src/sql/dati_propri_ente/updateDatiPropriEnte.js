import tabelle from 'tabelle';

export const updateDatiPropriEnte = 
` UPDATE ${tabelle.datiPropriEnte} 
        SET 
           tl_descrizione_ente=$[tl_descrizione_ente:json],
           js_referente=$[js_referente:json],
           js_primo_contatto=$[js_primo_contatto:json],
           js_altre_info=$[js_altre_info:json],
           tx_note_primo_contatto= $[note_per_cittadino]
        WHERE  id_ente_rif=$[id_ente_rif]`;