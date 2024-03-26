import { logger } from 'utility/logger/getInstance';
import { selectServizioErogatoStt } from 'sql/servizioerogatoentestt/selectServizioErogatoStt';
import { EstraiDescrittoriBenessere } from 'sql/servizioente/selectDescriptors';

/**
 * The class to interact with the servizio_erogato_ente tables
 */
class ServizioErogatoEnteDAO {
  /**
   * The constructor of the class
   * @param {object} db indicates the connection object
   */
  constructor(db, queryBuilder, logger, formatter, mediaPath, tabelle) {
    this.connection = db;
    this.mediaPath = mediaPath;
    this.helpers = queryBuilder;
    this.logger = logger;
    this.formatter = formatter;
    this.tabelle = tabelle;
  }

  async findOldState(id_servizio_ente) {
    const risultato = await this.connection.oneOrNone(selectServizioErogatoStt, { id_servizio_ente });
    return risultato?.cd_stato_dati_servizio_ente;
  }
  /**
   * Return the descriptors of the service
   * @param {number} parameters the id of the service
   * @returns {[]} the attachments of the service
   */
  async getDescriptors(parameters) {
    try {
      return await this.connection.oneOrNone(EstraiDescrittoriBenessere, parameters);
    }
    catch (error) {
      logger.error(error);
    }
  }
  async updateDescrittoreDelBenessereFg018(input) {
    // update del descrittore del benessere e del flag 018
    const columnsDescrittoreDelBenessereFg018 = new this.helpers.ColumnSet(
      [
        { name: 'nm_descrittore_movimento', prop: 'nm_descrittore_movimento' },
        { name: 'nm_descrittore_relazioni', prop: 'nm_descrittore_relazioni' },
        { name: 'nm_descrittore_competenze', prop: 'nm_descrittore_competenze' },
        { name: 'nm_descrittore_creativita', prop: 'nm_descrittore_creativita' },
        { name: 'nm_descrittore_autodeterm', prop: 'nm_descrittore_autodeterm' },
        { name: 'fg_0_18_anni', prop: 'fg_0_18_anni' }
      ],
      { table: this.tabelle.servizio_erogato_ente }
    );
    const conditionsDescrittoreDelBenessereFg018 = this.formatter.format(
      ' WHERE id_servizio_ente = $[id_servizio_ente]',
      input
    )
    const queryUpdateDescrittoreDelBenessereFg018 = this.helpers.update({
      nm_descrittore_movimento: input.nm_descrittore_movimento,
      nm_descrittore_relazioni: input.nm_descrittore_relazioni,
      nm_descrittore_competenze: input.nm_descrittore_competenze,
      nm_descrittore_creativita: input.nm_descrittore_creativita,
      nm_descrittore_autodeterm: input.nm_descrittore_autodeterm,
      fg_0_18_anni: input.fg_0_18_anni,
    }, columnsDescrittoreDelBenessereFg018) + conditionsDescrittoreDelBenessereFg018;

    await this.connection.none(queryUpdateDescrittoreDelBenessereFg018);
  }
}

export default ServizioErogatoEnteDAO;