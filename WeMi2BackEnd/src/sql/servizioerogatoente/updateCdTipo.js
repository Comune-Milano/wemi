import tabelle from 'tabelle';

export const updateCdTipo = (args) => {
    let baseQuery = `UPDATE ${tabelle.servizio_erogato_ente}
    SET `;

    if(args.input.cd_tipo_offerta_srv){
        baseQuery += 'cd_tipo_offerta_srv=$[cd_tipo_offerta_srv],';
    } else {
        baseQuery += 'cd_tipo_offerta_srv = null,';
    }
    if(args.input.cd_tipo_servizio_erog){
        baseQuery += 'cd_tipo_servizio_erog=$[cd_tipo_servizio_erog]';
    } else {
        baseQuery += 'cd_tipo_servizio_erog = null';
    }
    baseQuery +=` WHERE id_servizio_ente = $[id_servizio_ente]`;

    return baseQuery;
}