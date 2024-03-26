import tabelle from 'tabelle';

export const updateForModificaContenuto = (args) => {
    let baseQuery = `UPDATE  ${tabelle.servizio} SET `;

    if(args.input.txTagsRicerca){
        baseQuery += 'tx_tags_ricerca=$[txTagsRicerca],';
    }
    if(args.input.unitaPrezzo){
        baseQuery += ' cd_unita_prezzo=$[unitaPrezzo],';
    }

    baseQuery += `id_categoria_accreditamento=$[categoriaAccreditamento]
    where id_servizio=$[idContenuto]`;

    return baseQuery;
}