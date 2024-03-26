import tabelle from 'tabelle';

export const updateNote = (args) => {
    let baseQuery = `UPDATE ${tabelle.servizio_erogato_ente}
    SET `;

    if(args.input.js_note_adminwemi_su_servizio){
        baseQuery += 'js_note_adminwemi_su_servizio=$[js_note_adminwemi_su_servizio:json]';
    }

    baseQuery += ` WHERE id_servizio_ente=$[id_servizio_ente]`;

    return baseQuery;
}