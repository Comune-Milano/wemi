import tabelle from 'tabelle';


export const updateServizio = `UPDATE  ${tabelle.servizio} SET 
   tx_tags_ricerca=$[txTagsRicerca],
   cd_unita_prezzo=$[unitaPrezzo],
    id_categoria_accreditamento=$[categoriaAccreditamento]
    where id_servizio=$[id]`;