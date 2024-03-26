import AllegatoServizioEnteDao from 'dao/allegatoServizioEnte/allegatoServizioEnteDao';
import ServizioErogatoEnteDAO from 'dao/servizioErogatoEnte/servizioErogatoEnteDAO';

/**
 * Class to get the information of the service
 */
export class ServizioEnteDomain {
  /**
   * The constructor of the class
   * @param {*} context the context of graphql
   */
  constructor(context = {}) {
    const {
          db: connection,
        } = context;
    this.db = connection;
  }
  /**
   * Return the attachments of the service
   * @param {number} parameters the id of the service
   * @returns {AllegatoServizioEnteDao} the attachments
   */
  async getAttachments(parameters) {
    const allegatoServizioEnteDao = new AllegatoServizioEnteDao(this.db);
    const attachments = await allegatoServizioEnteDao.getAttachments(parameters);
    return attachments;
  }
  /**
   * Return the descriptors of the service
   * @param {number} parameters the id of the service
   * @returns {ServizioErogatoEnteDAO} the attachments
   */
  async getDescriptors(parameters) {
    const servizioEnteDAO = new ServizioErogatoEnteDAO(this.db);
    const descriptors = await servizioEnteDAO.getDescriptors(parameters);
    return descriptors;
  }
}