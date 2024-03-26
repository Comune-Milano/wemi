import { ApolloError } from 'apollo-server';
import { ContentFormatter } from './formatter';
import {
  selectById,
  selectMaxOrder,
  selectPublishedContentsByType,
  selectPublishedPrivacyContent,
} from 'sql/contenuto/selezione';
import tabelle from 'tabelle';
import { logger } from 'utility/logger/getInstance';
import { conditionCdArea, conditionSection, conditionServices, orderDefault, selectCategoriesWithServices, selectCategoriesWithServicesByTag } from 'sql/contenuto/selectAreasCategories';
import { condition0_18_active } from 'sql/sharedConditions/condition0_18';
import { selectMaxOrderTextualValues } from 'sql/contenuto/selectMaxOrderTextualValues';
import { selectPublishedContentsById } from 'sql/contenuto/selectPublishedContentsById';
import { CONTENT_MEDIA_PK_ID_ERROR } from 'errors/errors';

/**
 * Class for the table content
 */
export class ContenutoDAO {
  /**
   * The constructor of the class
   * @param {*} db the db object
   * @param {*} formatter the formatter
   * @param {*} contextInformation the context information
   */
  constructor(db, formatter, contextInformation = {}) {
    this.connection = db;
    this.formatter = formatter;
    this.locale = contextInformation.locale;
    this.contentFormatter = new ContentFormatter(contextInformation.builder, this.formatter);
    this.tableName = {
      table: tabelle.contenuto,
    };
  }

  /**
   * Gets the list of contents by type.
   * @param {number} tyContenuto the type of content
   * @returns {object[]} a list of content
   */
  getPublishedContentsByType(tyContenuto) {
    return this.connection.any(selectPublishedContentsByType, { tyContenuto });
  }
  /**
   * Gets the categories of domiciliary and 018.
   * @param args the type of the section and the area
   * @returns {object[]} a list of categories
   */
  getAllCategories(args) {
    try {
      let select = selectCategoriesWithServices;
      const { cdContenutoArea, cdContenutoSez, is018 } = args;
      const conditions = [];

      conditions.push(conditionServices);
      if (is018) {
        conditions.push(condition0_18_active);
      }

      if (cdContenutoArea && cdContenutoSez) {
        conditions.push(this.formatter.format(conditionCdArea, { cdContenutoArea }));
        conditions.push(this.formatter.format(conditionSection, { cdContenutoSez }));
      } else if (cdContenutoArea) {
        conditions.push(this.formatter.format(conditionCdArea, { cdContenutoArea }));
      }
      else if (cdContenutoSez) {
        conditions.push(this.formatter.format(conditionSection, { cdContenutoSez }));
      }
      const query = select + conditions.join(' ') + orderDefault;
      return this.connection.any(query, args);
    }
    catch (error) {
      logger.error(error);
      throw error;
    }
  }

   /**
    * Gets the categories of domiciliary and 018.
    * @param args the type of the section and the area
    * @returns {object[]} a list of categories
    */
  getAllCategoriesByTag(args) {
    try {
      let select = selectCategoriesWithServicesByTag;
      const query = select;
      return this.connection.any(query, args);
    }
    catch (error) {
      logger.error(error);
      throw error;
    }
  }

  /**
   * Gets the published privacy content, if any.
   * @returns {object} the privacy content
   */
  getPublishedPrivacyContent() {
    return this.connection.oneOrNone(selectPublishedPrivacyContent);
  }

  /**
   * Gets the published content by id
   * @param {number} idContenuto the id of the content
   * @returns {object} the content
   */
  async getPublishedContentById(idContenuto){
    let result = await this.connection.oneOrNone(selectPublishedContentsById, { idContenuto });
    if(!result) {
      throw new ApolloError(CONTENT_MEDIA_PK_ID_ERROR.message, CONTENT_MEDIA_PK_ID_ERROR.code);
    }
    return result;
  }

/**
 * The method to find the content information by id
 * @param {number} tyContenuto the ty of the content
 * @returns {object} of content
 */
  async getMaxOrderTextualValues(tyContenuto) {
    return this.connection.oneOrNone(selectMaxOrderTextualValues, { tyContenuto });
  }
  /**
   * Gets the max order visualization
   * @param {number} type the type of the content
   * @returns {object} the privacy content
   */
  getMaxOrderByType(type) {
    return this.connection.oneOrNone(selectMaxOrder, { type });
  }

   /**
    * The method to update the content information by identifier
    * @param {object} content the object with id identifier
    * @param {number} tyContenuto the ty of content
    * @param {number} id the id of content
    * @returns {*} of content
    */
  updateByContentType(content = {}, tyContenuto, id) {
    const updateQuery = this.contentFormatter.updateByContentType(content, id);
    return this.connection.none(updateQuery, { tyContenuto, id });
  }

  /**
   * The method to find the content information by id
   * @param {number} idContent the id of the content
   * @returns {object} of content
   */
  async getById(idContent) {
    const contents = await this.connection.any(selectById, { idContent, locale: this.locale });
    if (!(contents.length > 0)) {
      return null;
    }
    return contents.reduce(
      (acc, content) => ({
        ...content,
        media1: content.media1_id_media ? {
          id: content.media1_id_media,
          mime: content.media1_ty_mime,
          name: content.media1_nm_nome_media,
          path: content.path1,
        } : undefined,
        media2: content.media2_id_media ? {
          id: content.media2_id_media,
          mime: content.media2_ty_mime,
          name: content.media2_nm_nome_media,
          path: content.path2,
        } : undefined,
        media3: content.media3_id_media ? {
          id: content.media3_id_media,
          mime: content.media3_ty_mime,
          name: content.media3_nm_nome_media,
          path: content.path3,
        } : undefined,
        associates: [
          ...acc.associates,
          content.associato_id_contenuto ? {
            id: content.associato_id_contenuto,
            type: content.associato_ty_contenuto,
            text1: content.associato_tl_testo_1,
            text2: content.associato_tl_testo_2,
            text3: content.associato_tl_testo_3,
            text4: content.associato_tl_testo_4,
            text5: content.associato_tl_testo_5,
            link1: content.associato_ln_link_1,
            link2: content.associato_ln_link_2,
          } : undefined,
        ],

      }),
      { associates: [], media1: {}, media2: {}, media3: {} }
    );
  }

  /**
   * The method to find the content information list by type
   * @param {number} typeContent the type of the content
   * @param {object} parameters parameters
   * @returns {object[]} of content
   */
  getListByType(typeContent, parameters = {}) {
    const formattedSelectList = this.contentFormatter.getList(parameters, this.locale);
    return this.connection.any(formattedSelectList, { ...parameters, typeContent, locale: this.locale });
  }

  /**
   * The method to find the services information list by type
   * @param {number} typeContent the type of the content
   * @param {object} parameters parameters
   * @returns {object[]} of content
   */
  getContentServiceList(typeContent, parameters = {}) {
    const formattedSelectList = this.contentFormatter.getContentServiceList(parameters, this.locale);
    return this.connection.any(formattedSelectList, { ...parameters, typeContent, locale: this.locale });
  }

  /**
   * The method to find the content information list by type
   * @param {number} typeContent the type of the content
   * @param {object} parameters parameters
   * @returns {object[]} of content
   */
  getContentListByType(typeContent, parameters = {}) {
    const formattedSelectList = this.contentFormatter.getContentList(parameters, this.locale);
    return this.connection.any(formattedSelectList, { ...parameters, typeContent, locale: this.locale });
  }

  /**
   * The method to create the content
   * @param {object} content the content object
   * @returns {*} of content
   */
  create(content = {}) {
    const insertQuery = this.contentFormatter.insert(content);
    return this.connection.one(insertQuery);
  }

  /**
   * The method to update the content information by identifier
   * @param {object} content the object with id identifier
   * @returns {*} of content
   */
  update(content = {}) {
    const { id } = content;
    const updateQuery = this.contentFormatter.update(content);
    return this.connection.none(updateQuery, { id });
  }
  /**
   * The method to update contents
   * @param {object[]} contents the list of contents
   * @returns {*} of content
   */
  updateRows(contents = []) {
    return Promise.all(contents.map(content => {
      const updateQuery = this.contentFormatter.update(content);
      return this.connection.none(updateQuery, { id: content.id });
    }));
  }
}