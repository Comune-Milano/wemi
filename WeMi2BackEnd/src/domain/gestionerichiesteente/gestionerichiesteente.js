import { GestioneRichiesteEnteDAO } from 'dao/gestioneente/gestionerichiesteenteDAO';
import CalcolatoreRichiestaBase from 'resolvers/richiestaserviziobase/calcolaStatoRichiestaBase';
import { isYoung } from 'utility/isYoung';

/**
 * Class to interact with request manager for ente
 */
class GestioneRichiesteEnteDomain {
    /**
     * 
     * @param {object} context the graphql object for the context
     */
  constructor(context){
    const { user, db, logger } = context;
        // this.context = context;
    this.logger = logger;
    this.user = user;
    this.db = db;
  }

  async findRichiesteLoggedEnte(args){
    const { idEnte } = this.user;
    return await this.db.tx('TransazioneEstraiRichiesteEnte', async t => {
        /**
         * Updating the request before fetching 
         */
      const calcolatore = new CalcolatoreRichiestaBase(t, null, idEnte);
      await calcolatore.calcolaStatoRichieste();
        /**
         * Count the feedbacks and fetching the results as request ente
         */
      const gestioneRichiesteDao = new GestioneRichiesteEnteDAO(t);
      const countDaRichiedere = await gestioneRichiesteDao.countFeedbackNotRequestedForEnte(idEnte);
      const countConfermati = await gestioneRichiesteDao.countFeedbackConfirmedForEnte(idEnte);
      const countDaConfermare = await gestioneRichiesteDao.countFeedbackToConfirmForEnte(idEnte);
      const countRichieste = await gestioneRichiesteDao.countRequestsForEnte(idEnte, args);
      const results = await gestioneRichiesteDao.getRequestsForEnte(idEnte, args);

      const mappedResults = results.map((request) => ({
        ...request,
        isYoung: isYoung(request.dataNascitaUtente, request.codiceFiscaleUtente),
      }) );

      const resultTabellaRichiestaServizioEnte = {
        count: countRichieste, 
        result: mappedResults, 
        countDaRichiedere, 
        countConfermati, 
        countDaConfermare,
      };

      return resultTabellaRichiestaServizioEnte;
    });

  }


}

export default GestioneRichiesteEnteDomain;
