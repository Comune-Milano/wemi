import { isNullOrUndefined, isNumber } from 'util';
import { MediaFormatter } from './formatter';
import { Institution } from 'dto/institution/institution';
import { estraiLogoEnte, selectById } from 'sql/media/select';
import { eliminaMediaSql } from 'sql/media/delete';
import { logger } from 'utility/logger/getInstance';

/**
 * The class to define the dao for media
 */
export class MediaDao {
  /**
   * The constructor of the class
   * @param {object} db the connection object
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(db, builder, formatter) {
    this.connection = db;
    this.builder = builder;
    this.formatter = formatter;
    this.logger = logger;
    this.mediaFormatter = new MediaFormatter(builder, formatter);
  }
  /**
   * The method to delete a media
   * @param {object} media the media object
   * @returns {Institution} the result object
   */
  async deleteMedia(media) {

    if (isNullOrUndefined(media.id) || !isNumber(media.id)) {
      return;
    }
    try {
      return await this.connection.none(eliminaMediaSql, { idMedia: media.id });
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error deleting a media');
    }
  }
  /**
   * The method to insert a media of an institution
   * @param {object} media the media object
   * @returns {Institution} the result object
   */
  async insertMedia(media) {
    try {
      const queryInsert = this.mediaFormatter.formatInsert({ ...media });
      const dbResult = await this.connection.one(queryInsert);
      return dbResult;
    }
    catch (error) {
      // log the event error
      this.logger.error(error, 'error inserting a media');
    }
  }
  /**
   * The method to insert the logo of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async insertLogo(institution) {
    const institutionId = institution.getId();

    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const { logo } = institution;
      const queryInsert = this.mediaFormatter.formatInsert(logo);
      const dbResult = await this.connection.one(queryInsert);
      const institutionResult = new Institution({
        institutionLogo: dbResult,
        institutionId,
      });
      return institutionResult;

    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error inserting a logo for institution card');
    }
  }
  /**
   * The method to insert the attachments of an institution
   * @param {Institution} institution the institution object
   * @returns {Institution} the result object
   */
  async findLogo(institution) {
    const institutionId = institution.getId();

    if (isNullOrUndefined(institutionId) || !isNumber(institutionId)) {
      return;
    }
    try {
      const dbResult = await this.connection.oneOrNone(estraiLogoEnte, { institutionId });
      const institutionResult = new Institution({
        institutionLogo: dbResult,
        institutionId,
      });
      return institutionResult;
    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error finding the logo for institution card');
    }
  }

  /**
   * The method to insert the attachments of an institution
   * @param {object} media the media
   * @returns {object} the media
   */
  async findById(media) {
    const { id } = media;

    if (isNullOrUndefined(id) || !isNumber(id)) {
      return;
    }
    try {
      return await this.connection.oneOrNone(selectById, { id });

    }
    catch (error) {
      //log the event error
      this.logger.error(error, 'error finding the media');
    }
  }
}