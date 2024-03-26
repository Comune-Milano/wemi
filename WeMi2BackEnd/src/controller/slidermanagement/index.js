import path from 'path';
import { STORAGE_BOUND_PATH } from 'environment';
import { tyContenuto } from 'constants/db/ty_contenuto';
import { SliderContentDomain } from 'domain/content/slider018';

/**
 * Class controller for content management
 */
export class ContentSliderManagment {
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
  async getSliderListContent(args) {
    const { filters = {}, page, elementsPerPage } = args;
    return this.db.task((task) => {
      const contentDomain = new SliderContentDomain({ ...this.context, db: task });
      return contentDomain.getList({
        page,
        filters,
        elementsPerPage,
        type: tyContenuto.SLIDER,
      });
    });
  }

  /**
   * Function to get the list of sections
   * @param {object} args the arguments of the query
   * @returns {object[]} the list of sections
   */
  async getSliderList(args) {
    const { filters = {}, page, elementsPerPage } = args;
    return this.db.task((task) => {
      const contentDomain = new SliderContentDomain({ ...this.context, db: task });
      return contentDomain.getContentList({
        page,
        filters,
        elementsPerPage,
        type: tyContenuto.SLIDER,
      });
    });
  }
  /**
   * Method to publish the section
   * @param {object} args the args
   * @returns {*} any
   */
  async publishContentSlider(args) {
    const { id } = args;
    await this.db.tx((transaction) => {
      const contentDomain = new SliderContentDomain({ ...this.context, db: transaction });
      return contentDomain.publish(id);
    });
    return id;
  }
  /**
   * Function to get the section
   * @param {object} args the args
   * @returns {*} any
   */
  saveContent(args = {}) {
    return this.db.tx(async (transaction) => {
      const contentDomain = new SliderContentDomain({ ...this.context, db: transaction });
      const isModify = await contentDomain.exist(args.id);
      if(isModify){
        return contentDomain.update({ ...args, type: tyContenuto.SLIDER });
      }
      return contentDomain.create({ ...args, type: tyContenuto.SLIDER });
    });
  }
  /**
   * Method to disable the section
   * @param {object} args the args
   * @returns {*} any
   */
  async disableContentSlider(args) {
    const { id } = args;
    await this.db.tx((transaction) => {
      const contentDomain = new SliderContentDomain({ ...this.context, db: transaction });
      return contentDomain.disable(id);
    });
    return id;
  }
  /**
   * Function to get the section
   * @param {object} args the args
   * @returns {*} any
   */
  getContent(args) {
    const { id } = args;
    const contentDomain = new SliderContentDomain(this.context);
    return contentDomain.get(id);
  }
  /**
   * Function to get max order
   * @returns {*} any
   */
  async getMaxOrderContentSlider() {
    const contentDomain = new SliderContentDomain(this.context);
    const result = await contentDomain.getMaxOrder(tyContenuto.SLIDER);
    return (result.order + 1) || 1;
  }
}

