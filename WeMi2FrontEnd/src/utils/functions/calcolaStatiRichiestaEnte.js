import { RICHIESTA_ENTE_ACCETTATA, RICHIESTA_ENTE_CONVERSAZIONE, RICHIESTA_ENTE_ANNULLATA, RICHIESTA_ENTE_CHIUSA, RICHIESTA_ENTE_SCADUTA, RICHIESTA_ENTE_PAGATA, RICHIESTA_ENTE_INOLTRATA } from "types/stati-richieste/richiesteEnte";

/**
 * 
 * @param {Object} richiesta
 * The request of the ente 
 * It returns the state of the request ente @returns {String} 
 */
export const calcolaStatiRichiestaEnte = ( richiesta ) => {
    let statoRichiesta = '';
    const inoltrata = richiesta.statoRichiestaEnte === RICHIESTA_ENTE_INOLTRATA;
    const accettata = richiesta.statoRichiestaEnte === RICHIESTA_ENTE_ACCETTATA;
    const conversazione = richiesta.statoRichiestaEnte === RICHIESTA_ENTE_CONVERSAZIONE;
    const annullata = richiesta.statoRichiestaEnte === RICHIESTA_ENTE_ANNULLATA;
    const chiusa = richiesta.statoRichiestaEnte === RICHIESTA_ENTE_CHIUSA;
    const scaduta = richiesta.statoRichiestaEnte === RICHIESTA_ENTE_SCADUTA;
    const pagata = richiesta.statoRichiestaEnte === RICHIESTA_ENTE_PAGATA;
    if (inoltrata) {
        statoRichiesta = 'Richiesta inoltrata';
    }
    else if (accettata) {
        statoRichiesta = 'Richiesta accettata';
    }
    else if (conversazione) {
        richiesta.statoChat !== '0' ?
            statoRichiesta = 'Richieste informazioni aggiuntive' : statoRichiesta = 'Hai chiuso la chat';
    }
    else if (annullata) {
        statoRichiesta = 'Rifiutata/Chiusa';

    }
    else if (chiusa) {
        statoRichiesta = 'Richiesta chiusa';

    }
    else if (scaduta) {
        statoRichiesta = 'Richiesta scaduta';

    }
    else if (pagata) {
        statoRichiesta = 'Pagata';
    }

    return statoRichiesta;
}
