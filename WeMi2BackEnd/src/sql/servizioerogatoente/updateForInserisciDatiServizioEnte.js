import tabelle from 'tabelle';
import { isNullOrUndefined, isString } from "util";

export const updateForInserisciDatiServizioEnte = (args) => {

    let baseQuery = `UPDATE ${tabelle.servizio_erogato_ente} SET `;

    const updatesSet = [];

    if (args.input.tl_procedura_attivazione) {
        updatesSet.push('tl_procedura_attivazione=$[tl_procedura_attivazione]');
    }

    if (args.input.tx_note_al_prezzo) {
        updatesSet.push('tx_note_al_prezzo=$[tx_note_al_prezzo]');
    }

    if (args.input.tl_descrizione_servizio_ente) {
        updatesSet.push('tl_descrizione_serv_erog_ente=$[tl_descrizione_servizio_ente]');
    }

    if (args.input.dt_inizio_erog_serv) {
        updatesSet.push('dt_inizio_erog_serv=$[dt_inizio_erog_serv]');
    }

    if (args.input.dt_fine_erog_serv) {
        updatesSet.push('dt_fine_erog_serv=$[dt_fine_erog_serv]');
    }

    if (!isNullOrUndefined(args.input.tx_altre_mansioni) && args.input.tx_altre_mansioni.length > 0) {
        updatesSet.push('tx_altre_mansioni=$[tx_altre_mansioni]');
    } else {
        updatesSet.push(`tx_altre_mansioni=${null}`);
    }

    if (!isNullOrUndefined(args.input.tx_altra_sede)) {
        updatesSet.push('tx_altra_sede=$[tx_altra_sede]');
    }

    if (args.input.dt_inizio_val_offerta_prezzo) {
        updatesSet.push('dt_inizio_val_offerta_prezzo=$[dt_inizio_val_offerta_prezzo]');
    }

    if (args.input.dt_fine_val_offerta_prezzo) {
        updatesSet.push('dt_fine_val_offerta_prezzo=$[dt_fine_val_offerta_prezzo]');
    }

    if (args.input.js_info_personale) {
        updatesSet.push('js_info_personale=$[js_info_personale:json]');
    }

    if (args.input.fg_accompagnamento_altra_sede) {
        updatesSet.push('fg_accompagnamento_altra_sede=$[fg_accompagnamento_altra_sede]');
    }

    if(!isNullOrUndefined(args.input.nomeServizio)){
       updatesSet.push('tx_nome_servizio=$[nomeServizio]');
    }

    if(!isNullOrUndefined(args.input.ulterioriInformazioni)){
        updatesSet.push('tx_ulteriori_informazioni=$[ulterioriInformazioni]');
     }

    updatesSet.push('cd_modalita_erogazione=$[cd_modalita_erogazione]');

    baseQuery += updatesSet.join(',');
    baseQuery += ` WHERE id_servizio_ente=$[id_servizio_ente];`;

    return baseQuery;
}