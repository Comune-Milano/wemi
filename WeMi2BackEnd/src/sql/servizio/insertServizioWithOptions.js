import tabelle from 'tabelle';

export const insertServizioWithOptions = (args) => {
    let baseQuery = `INSERT INTO ${tabelle.servizio}(
        id_categoria_accreditamento,
        tx_tags_ricerca,
        cd_unita_prezzo,
        id_servizio) 
          values(
            $[categoriaAccreditamento],`;

    if (args.input.txTagsRicerca) {
        baseQuery += '$[txTagsRicerca],';
    } else {
        baseQuery += "' ',";
    }
    if (args.input.unitaPrezzo) {
        baseQuery += '$[unitaPrezzo],';
    } else {
        baseQuery += '0,';
    }

    baseQuery += '$[idContenuto])';

    return baseQuery;
}
