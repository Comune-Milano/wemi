import { FEEDBACK_NON_RICHIESTO, FEEDBACK_RICHIESTO, FEEDBACK_RILASCIATO, FEEDBACK_CONFERMATO } from "types/stati-richieste/feedback";
import { isNullOrUndefined } from "util";
/**
 * @param {Object} richiestaEnte
 * @returns {String}
 */
export const calcolaStatoFeedback = (richiestaEnte) => {
    let statoFeedback = '';
    const feedbackND = isNullOrUndefined(richiestaEnte.statoRecensione) || richiestaEnte.statoRecensione ===  FEEDBACK_NON_RICHIESTO? true : false;
    const feedbackRichiesto = richiestaEnte.statoRecensione === FEEDBACK_RICHIESTO;
    const feedbackRilasciato = richiestaEnte.statoRecensione === FEEDBACK_RILASCIATO;
    const feedbackConfermato = richiestaEnte.statoRecensione === FEEDBACK_CONFERMATO;
    if (feedbackND){
        statoFeedback = 'Non richiesto';
    }
    else if (feedbackRichiesto){
        statoFeedback = 'Richiesto';
    }
    else if (feedbackRilasciato){
        statoFeedback = 'Rilasciato';
    }
    else if (feedbackConfermato){
        statoFeedback = 'Confermato';
    }
    return statoFeedback;
}