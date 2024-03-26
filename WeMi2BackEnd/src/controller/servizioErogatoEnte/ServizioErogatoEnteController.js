import { ServizioErogatoEnteManagerDomain } from 'domain/servizioErogatoEnte/ServizioErogatoEnteManagerDomain';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { TEMPLATE_CONFERMA_SERVIZIO_ENTE } from 'constants/templates/database_template';
import { STATO_SCHEDA_ENTE } from 'constants/db/statoschedaente';

/**
 * Servizio Erogato Controller class
 */
export class ServizioErogatoEnteController {
  /**
   * The constructor of the class
   * @param {object} db the object
   * @param {object} context the context
   */
  constructor(db, context = {}) {
    this.db = db;
    this.context = context;
  }

  async insert(input) {
    this.db.tx(async t => {
      const servizioErogatoEnteManagerDomain = new ServizioErogatoEnteManagerDomain(t, this.context);
      const findAll = await servizioErogatoEnteManagerDomain.find(input.id_servizio_ente);
      //se lo stato passa a COMPILATA viene inoltrata un'email che avvisa l'admin
      if (
        input?.cd_stato_dati_servizio_ente === STATO_SCHEDA_ENTE.COMPILATA &&
        findAll.oldState !== STATO_SCHEDA_ENTE.COMPILATA
      ) {
      }
      // salvataggio dati
      await servizioErogatoEnteManagerDomain.save(input);
    })
  }

  async find(id_servizio_ente) {
    const servizioErogatoEnteManagerDomain = new ServizioErogatoEnteManagerDomain(this.db, this.context);
    const findAll = await servizioErogatoEnteManagerDomain.find(id_servizio_ente);
    return findAll;
  }
}