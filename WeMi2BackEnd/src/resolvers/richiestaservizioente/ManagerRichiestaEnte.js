
import {
  selectStatoRichiestaEnte,
  selectStatiRichiesteEnteByRichiestaBase,
  insertStatiRichiestaServizioEnte,
  updateIdTransazionePagamentoRichiestaEnte,
} from './queries/query';
import {
  insertStatoRichiestaServizioBase,
  selectRichiestaBaseByRichiestaEnte,
} from '../richiestaserviziobase/queries/query';
import {
  RICHIESTA_ENTE_ACCETTATA,
  RICHIESTA_ENTE_CHIUSA,
  RICHIESTA_ENTE_PAGATA,
  RICHIESTA_ENTE_ANNULLATA,
  RICHIESTA_ENTE_SCADUTA,
} from './constants/StatoRichiestaEnte';
import { RICHIESTA_BASE_PAGATA } from '../richiestaserviziobase/constants/StatoRichiestaBase';
import { CHAT_TERMINATA } from 'constants/db/chatStatus';

/**
 * Gestore richiesta ente.
 */
export class ManagerRichiestaEnte {
  constructor(dbContext, idRichiestaEnte) {
    this.dbContext = dbContext;
    this.idRichiestaEnte = idRichiestaEnte;
  }

  /**
   * Restituisce lo stato correnta della richiesta.
   */
  getStatoRichiestaEnte() {
    return this.dbContext.db.one(
      selectStatoRichiestaEnte,
      { idRichiestaServizioEnte: this.idRichiestaEnte }
    );
  }

  /**
   * Determina se la richiesta è acquistabile.
   */
  async isRichiestaEnteAcquistabile() {
    const richiesta = await this.getStatoRichiestaEnte();
    return richiesta.cdStato === RICHIESTA_ENTE_ACCETTATA &&
      new Date(richiesta.scadenzaAcquisto).getTime() > new Date().getTime();
  }

  /**
   * Setta la richiesta ente come pagata.
   */
  async setRichiestaEnteAsPagata() {
    return this.dbContext.db.tx('set-richiesta-ente-as-pagata', async transaction => {

      // Seleziona la richiesta base associata a quella ente.
      const richiestaBase = await transaction.one(
        selectRichiestaBaseByRichiestaEnte,
        { idRichiestaEnte: this.idRichiestaEnte }
      );

      // Seleziona tutte le richieste ente associate a quella base.
      const statiRichiesteEnte = await transaction.any(
        selectStatiRichiesteEnteByRichiestaBase,
        { idRichiestaBase: richiestaBase.idRichiestaBase }
      );

      /**
       * Inserisco nello storico tutte le richieste ente, che non sono in stato 
       * CHIUSA(5) o SCADUTA(6) associate a quella base come "RIFIUTATA(4)" 
       * eccetto che la richiesta ente acquistata che viene settata come tale (i.e. "acquistata").
       */
      const newStatiRichiestaEnte = statiRichiesteEnte
        .filter(({ statoRichiestaEnte }) => (
          !([RICHIESTA_ENTE_CHIUSA, RICHIESTA_ENTE_SCADUTA].indexOf(statoRichiestaEnte) >= 0)
        ))
        .map(({
          idRichiestaEnte,
          statoRichiestaEnte,
          statoChat,
          idUtente,
        }) => ({
          idRichiestaEnte,
          statoRichiestaEnte: idRichiestaEnte === this.idRichiestaEnte ?
            RICHIESTA_ENTE_PAGATA :
            RICHIESTA_ENTE_ANNULLATA,
          statoChat: CHAT_TERMINATA,
          idUtente
        }));
        
      const valueInsert = newStatiRichiestaEnte.reduce((accumulator, {
        idRichiestaEnte,
        statoRichiestaEnte,
        statoChat,
        idUtente
      }, index) => {
        const userId = this.dbContext.user.idUtente;
        let values = `(${idRichiestaEnte}, localtimestamp, ${statoRichiestaEnte}, ${statoChat}, ${userId})`;
        values += index === (newStatiRichiestaEnte.length - 1) ? ';' : ',';

        return `${accumulator} ${values}`;
      }, '');

      const insertsStatiRichiestaEnte = insertStatiRichiestaServizioEnte(valueInsert);
      await transaction.none(insertsStatiRichiestaEnte);

      // Aggiorno lo storico della richiesta base settandola come pagata.
      const newStatoRichiestaBase = {
        idRichiestaBase: richiestaBase.idRichiestaBase,
        stato: RICHIESTA_BASE_PAGATA,
        idUtente: richiestaBase.idUtente
      };
      await transaction.none(
        insertStatoRichiestaServizioBase,
        newStatoRichiestaBase
      );
    });
  }

  /**
   * Updates the internal transaction id associated to the request.
   */
  updateIdTransazionePagamento(idInternoTransPag) {
    return this.dbContext.db.none(
      updateIdTransazionePagamentoRichiestaEnte,
      {
        idRichiestaEnte: this.idRichiestaEnte,
        idInternoTransPag
      }
    );
  }
}