import { listaMansioniPerFeedback } from 'sql/valattributodomanda/listaMansioniPerFeedback';
import { selectRecensione } from 'sql/recensioneente/selectRecensione';
import { selectLavoratoriAssociatiPerRecensione } from 'sql/rmatchriclav/selectlavoratoriassociatiperrecensione';
import { selectServiziFeedbackLavoratore } from 'sql/valattributodomanda/selectServiziFeedbackLavoratore';
import { selectAllFeedbacks } from 'sql/recensioneente/selectAllFeedbacks';

export default class RecensioneLavoratoreTcbDAO {
    constructor(db) {
        this.db = db;
    }

    getRichiesta(idRichiesta) {
        return this.db.any(selectServiziFeedbackLavoratore, { id_richiesta_servizio_tcb: idRichiesta });
    }
    getMansioni(idRichiesta) {
        return this.db.any(listaMansioniPerFeedback, { id_richiesta_servizio_tcb: idRichiesta })
    }
    getRecensione(idRichiesta, pgRichServRec) {
        return this.db.oneOrNone(selectRecensione(pgRichServRec), { id_rich_serv_rec: idRichiesta, pg_rich_serv_rec: pgRichServRec })
    }
    getDatiLavoratore(context, codiceRichiesta, locale) {
        return this.db.oneOrNone(selectLavoratoriAssociatiPerRecensione(context), { codiceRichiesta, locale })
    }
    getAllFeedbacks(idRichiesta) {
        return this.db.any(selectAllFeedbacks, { id_rich_serv_rec: idRichiesta })
    }
}