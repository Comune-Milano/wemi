import { isNullOrUndefined, isNumber } from 'util';
import { AttachmentInstitutionFormatter } from './formatter';
import { Institution } from 'dto/institution/institution';
import { findLogoAndAttachmentsForEnte } from 'sql/ente/institution';
import { eliminaAllegatoEnteByIdSql } from 'sql/allegatoente/delete';
import { estraiInformazioniAllegatoSql } from 'sql/allegatoente/select';
import { logger } from 'utility/logger/getInstance';

/**
 * The class to define the dao for attachments on institutions
 */
export class AttachmentInstitutionDao {
  /**
   * The constructor of the class
   * @param {object} db the connection object
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(db, builder, formatter){
    this.connection = db;
    this.builder = builder;
    this.formatter = formatter;
    this.logger = logger;
    this.attachmentFormatter = new AttachmentInstitutionFormatter(builder, formatter);
  }
  /**
   * The method to find the attachments of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async findAttachments(institution){
    const institutionId = institution.getId();
    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const dbResult = await this.connection.any(findLogoAndAttachmentsForEnte, { institutionId });
      const institutionResult = new Institution({ institutionDocuments: dbResult});
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error finding the attachments for institution card');
    }
  }

  /**
   * The method to find an attachment of an institution
   * @param {object} institution the institution object
   * @param {string} media the media 
   * @returns {object} the result object
   */
  async findAttachment(institution, media) {

    if (isNullOrUndefined(institution)) {
      return;
    }
    try {
      const institutionId = institution.getId();
      const dbResult = await this.connection.oneOrNone(estraiInformazioniAllegatoSql, { 
        institutionId, 
        tipo: media.type, 
      });
      return dbResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error finding the attachment for institution card');
    }    
  }
  /**
   * The method to delete an attachment of an institution
   * @param {Institution} institution the institution object
   * @param {object} media the media object
   * @returns {Institution} the result object
   */
  async deleteAllegato(institution, media){
    const institutionId = institution.getId();

    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const dbResult = await this.connection.none(eliminaAllegatoEnteByIdSql, { 
        id_media: media.id,
        id_ente: institutionId, 
      });
      const institutionResult = new Institution(dbResult);
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error deleting the attachment for institution card');
    }
    
  }
  /**
   * The method to insert an attachment of an institution
   * @param {Institution} institution the institution object
   * @param {object} attachment the media object
   * @returns {object} the result object
   */
  async insertAttachment(institution, attachment){
    const institutionId = institution.getId();

    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const queryInsert = this.attachmentFormatter.formatInsert(attachment, institutionId);
      const dbResult = await this.connection.one(queryInsert);
      return dbResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error inserting the attachment for institution card');
    }
    
  }
}

