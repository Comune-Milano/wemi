import { ServizioEnteDomain } from 'domain/servizioente';

/**
 *ServizioEnte Controller Class
 */
export class ServizioEnteController {
  /**
   * The constructor of the class
   * @param {*} context the context of graphql
   */
  constructor(context = {})  {
    this.context = context;
  }
  /**
   * Return the attachments of the service
   * @param {number} parameters the id of the service
   * @returns {ServizioEnteDomain} the attachments
   */
  async getAttachments(parameters) {
    const servizioEnteDomain = new ServizioEnteDomain(this.context);
    const attachments = await servizioEnteDomain.getAttachments(parameters);
    return attachments;
  }
  /**
   * Return the descriptors of the service
   * @param {number} parameters the id of the service
   * @returns {ServizioEnteDomain} the attachments
   */
  async getDescriptors(parameters) {
    const servizioEnteDomain = new ServizioEnteDomain(this.context);
    const descriptors = await servizioEnteDomain.getDescriptors(parameters);
    return descriptors;
  }
}