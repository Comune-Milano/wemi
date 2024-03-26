import { deleteAllegatoServizioEnte } from 'sql/allegatoServizioEnte/delete';
import { EstraiAllegatiServizioEnte } from 'sql/servizioente/selectAttachments';

/**
 * The class to interact with the allegato_servizio_ente tables
 */
class AllegatoServizioEnteDao {
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

  async deleteFromAllegatoServizioEnte(idMedia) {
    await this.connection.oneOrNone(deleteAllegatoServizioEnte, { idMedia });
  }

  async insertFromAllegatoServizioEnte(id_servizio_ente, id_media, ty_allegato, nr_progressivo_slider) {
    const columnsAllegatoServizioEnte = new this.helpers.ColumnSet(
      [
        { name: 'id_servizio_ente', prop: 'id_servizio_ente' },
        { name: 'id_media', prop: 'id_media' },
        { name: 'ty_allegato', prop: 'ty_allegato' },
        { name: 'nr_progressivo_slider', prop: 'nr_progressivo_slider' },
      ],
      { table: 'allegato_servizio_ente' }
    );
    const queryInsertAllegatoServizioEnte = this.helpers.insert({
      id_servizio_ente,
      id_media,
      ty_allegato,
      nr_progressivo_slider,
    }, columnsAllegatoServizioEnte);

    await this.connection.none(queryInsertAllegatoServizioEnte);
  }

  async getAttachments(parameters) {
    try {
      return await this.connection.any(EstraiAllegatiServizioEnte, parameters);
    }
    catch (error) {
      logger.error(error);
    }
  }

}

export default AllegatoServizioEnteDao;