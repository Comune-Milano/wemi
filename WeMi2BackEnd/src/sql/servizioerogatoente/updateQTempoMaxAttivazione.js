import tabelle from 'tabelle';

export const updateQTempoMaxAttivazione = (args) => {
    let baseQuery =  `UPDATE ${tabelle.servizio_erogato_ente} SET `;

    if(args.input.qt_tempo_max_attivazione !== undefined){
        baseQuery += 'qt_tempo_max_attivazione=$[qt_tempo_max_attivazione]';
    }

    baseQuery += ` WHERE id_servizio_ente=$[id_servizio_ente]`;

    return baseQuery;

}