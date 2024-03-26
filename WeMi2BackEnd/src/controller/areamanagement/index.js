import path from 'path';
import { STORAGE_BOUND_PATH } from 'environment';
import { tyContenuto } from 'constants/db/ty_contenuto';
import { AreaContentDomain } from 'domain/content/area';

/**
 * Class controller for content management
 */
export class AreaContentManagement {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   * @param {string} locale the locale
   */
  constructor(context, locale = 'it') {
    const { user = {}, db, logger, formatter, queryBuilder } = context;
    this.context = { ...context, locale };
    this.logger = logger;
    this.user = user;
    this.db = db;
    this.formatter = formatter;
    this.helpers = queryBuilder;
    this.locale = locale;
    const wemiMediaFilesPath = path.join(
      __dirname,
      STORAGE_BOUND_PATH,
      'media'
    );
    this.mediaPath = wemiMediaFilesPath;
  }

    /**
     * Function to get the list of sections
     * @param {object} args the arguments of the query
     * @returns {object[]} the list of sections
     */
  async getAreas(args) {
    const { filters = {}, page, elementsPerPage } = args;
    return this.db.task((task) => {
      const contentDomain = new AreaContentDomain({ ...this.context, db: task });
      return contentDomain.getList({
        page,
        filters,
        elementsPerPage,
        type: tyContenuto.AREA,
      });
    });
  }
    /**
     * Method to disable the area
     * @param {object} args the args
     * @returns {*} any
     */
  async disableArea(args) {
    const { id } = args;
    await this.db.tx((transaction) => {
      const contentDomain = new AreaContentDomain({ ...this.context, db: transaction });
      return contentDomain.disable(id);
    });
    return id;
  }
  
    /**
     * Method to publish the area
     * @param {object} args the args
     * @returns {*} any
     */
  async publishArea(args) {
    const { id } = args;
    await this.db.tx((transaction) => {
      const contentDomain = new AreaContentDomain({ ...this.context, db: transaction });
      return contentDomain.publish(id);
    });
    return id;
  }
  
    /**
     * Function to get the area
     * @param {object} args the args
     * @returns {*} any
     */
  getArea(args) {
    const { id } = args;
    const contentDomain = new AreaContentDomain(this.context);
    return contentDomain.get(id);
  }
  
    /**
     * Function to get max order
     * @returns {*} any
     */
  async getMaxOrderArea() {
    const contentDomain = new AreaContentDomain(this.context);
    const result = await contentDomain.getMaxOrder(tyContenuto.AREA);
    return (result.order + 1) || 1;
  }

  /**
   * Function to get the area
   * @param {object} args the args
   * @returns {*} any
   */
  getArea(args) {
    const { id } = args;
    const contentDomain = new AreaContentDomain(this.context);
    return contentDomain.get(id);
  }

  /**
   * Function to get the area
   * @param {object} args the args
   * @returns {*} any
   */
  saveArea(args = {}) {
    return this.db.tx(async (transaction) => {
      const contentDomain = new AreaContentDomain({ ...this.context, db: transaction });
      const isModify = await contentDomain.exist(args.id);
      if(isModify){
        return contentDomain.update({ ...args, type: tyContenuto.AREA });
      }
      return contentDomain.create({ ...args, type: tyContenuto.AREA });
    });
  }
}

