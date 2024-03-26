import path from 'path';
import { ApolloError } from 'apollo-server-errors';
import { CONTENT_STATE } from 'constants/db/contentstate';
import { STORAGE_BOUND_PATH } from 'environment';
import { ContenutoDAO } from 'dao/contenuto/contenutoDAO';
import { ContenutoSttDAO } from 'dao/contenutostt';
import { CONTENT_CODE_INVALID } from 'errors/content';

export const ORDER_CONTENT = {
  ID: 1,
  DESCRIPTION: 2,
  PROGRESSIVE: 3,
};

/**
 * Class domain for content management
 */
export class ContentDomain {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   */
  constructor(context) {
    const { user, db, logger, formatter, queryBuilder } = context;
    this.locale = context.locale;
    this.logger = logger;
    this.user = user;
    this.db = db;
    this.formatter = formatter;
    this.helpers = queryBuilder;
    const wemiMediaFilesPath = path.join(
      __dirname,
      STORAGE_BOUND_PATH,
      'media'
    );
    this.mediaPath = wemiMediaFilesPath;
  }
  /**
   * Function to get the list of contents by type
   * @param {object} parameters the parameters
   * @returns {object[]} the list of contents
   */
  async getList(parameters) {
    const { filters = {}, page, elementsPerPage, type: typeContent } = parameters;
    const contenutoDao = new ContenutoDAO(this.db, this.formatter, {
      locale: this.locale,
    });

    const offset = (page - 1) * elementsPerPage;

    const contents = await contenutoDao.getListByType(typeContent, {
      filters,
      offset,
      elementsPerPage,
    });

    const reducedContents = contents.reduce(
      (acc, content) => ({
        total: content.count ? Number(content.count) : 0,
        list: [...acc.list, content],
      }),
      { list: [] }
    );

    if (!reducedContents.total) {
      reducedContents.total = 0;
    }

    return reducedContents;
  }

  /**
   * Function to get the list of contents by type
   * @param {object} parameters the parameters
   * @returns {object[]} the list of contents
   */
  async getContentList(parameters) {
    const { filters = {}, type: typeContent } = parameters;
    const contenutoDao = new ContenutoDAO(this.db, this.formatter, {
      locale: this.locale,
    });

    const contents = await contenutoDao.getContentListByType(typeContent, {
      filters,
    });
    const reducedContents = contents.reduce(
      (acc, content) => ({
        total: content.count ? Number(content.count) : 0,
        list: [...acc.list, content],
      }),
      { list: [] }
    );

    if (!reducedContents.total) {
      reducedContents.total = 0;
    }

    return reducedContents;
  }

  /**
   * Function to publish a content
   * @param {number} id the content identifier
   * @returns {*} the result
   */
  publish(id) {
    const contenutoDao = new ContenutoSttDAO({ db: this.db, formatter: this.formatter, builder: this.helpers });
    return contenutoDao.insert(
      { id, state: CONTENT_STATE.PUBLISHED },
      this.user?.idUtente
    );
  }

  /**
   * Function to publish a content
   * @param {number} id the content identifier
   * @returns {*} the result
   */
  disable(id) {
    const contenutoDao = new ContenutoSttDAO({ db: this.db, formatter: this.formatter, builder: this.helpers });
    return contenutoDao.insert(
      { id, state: CONTENT_STATE.DISABLED },
      this.user?.idUtente
    );
  }

  /**
   * the method to get the content
   * @param {number} id the identifier
   * @returns {object} the content
   */
  get(id) {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter);
    return contenutoDao.getById(id);
  }

  /**
   * the method to get the content
   * @param {number} type the type
   * @returns {object} the content
   */
  getMaxOrder(type) {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter);
    return contenutoDao.getMaxOrderByType(type);
  }

  /**
   * Function to publish a content
   * @param {number} id the content identifier
   * @returns {*} the result
   */
  async exist(id) {
    const content = await this.get(id);
    if(!content){
      return false;
    }
    return true;
  }

  /**
   * The method to verify if the content as same code of others
   * @param {*} content the content
   * @returns {*} any
   */
  async hasSameCode(content = {}) {
    const { type, id } = content;
    const { list: contents = [] } = await this.getList({ type, filters:{
      noConditions: true,
    } });
    contents.forEach((dbContent) => {
      if(content.code && dbContent.code === content.code && dbContent.id !== id){
        throw new ApolloError(CONTENT_CODE_INVALID.message, CONTENT_CODE_INVALID.code);
      }
    });
  }

  /**
   * The method to shift the order of the elements
   * @param {object} content the content
   * @returns {*} any
   */
  async shiftOrder(content) {
    const { type, id, progressive } = content;

    const { list: contents = [] } = await this.getList({ type, filters: { order: ORDER_CONTENT.PROGRESSIVE } });
    const elementsToShift = contents.filter((dbContent) => {
      if(dbContent.id !== id && dbContent.progressive >= progressive) {
        return true;
      }
      return false;
    });

    if(elementsToShift.length >= 0){
      let newProgressive = progressive;
      const mappedShiftElements = elementsToShift.map((elementToShift) => ({
        ...elementToShift,
        type,
        progressive: newProgressive += 1,
      }));
      const contentDao = new ContenutoDAO(this.db, this.formatter, { builder: this.helpers });
      return contentDao.updateRows(mappedShiftElements);
    }

    return Promise.resolve();


  }
}
