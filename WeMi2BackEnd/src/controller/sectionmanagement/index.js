import path from 'path';
import { STORAGE_BOUND_PATH } from 'environment';
import { SectionContentDomain as SectionContent } from 'domain/content/sections';
import { tyContenuto } from 'constants/db/ty_contenuto';

/**
 * Class controller for content management
 */
export class SectionContentManagement {
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
  async getSections(args) {
    const { filters = {}, page, elementsPerPage } = args;
    return this.db.task((task) => {
      const contentDomain = new SectionContent({ ...this.context, db: task });
      return contentDomain.getList({
        page,
        filters,
        elementsPerPage,
        type: tyContenuto.SEZIONI,
      });
    });
  }
  /**
   * Function to get the content list of sections
   * @param {object} args the arguments of the query
   * @returns {object[]} the list of sections
   */
  async getContentAllSections(args) {
    const { filters = {}} = args;
    return this.db.task((task) => {
      const contentDomain = new SectionContent({ ...this.context, db: task });
      return contentDomain.getSections({
        filters,
        type: tyContenuto.SEZIONI,
      });
    });
  }
  /**
   * Method to disable the section
   * @param {object} args the args
   * @returns {*} any
   */
  async disableSection(args) {
    const { id } = args;
    await this.db.tx((transaction) => {
      const contentDomain = new SectionContent({ ...this.context, db: transaction });
      return contentDomain.disable(id);
    });
    return id;
  }

  /**
   * Method to publish the section
   * @param {object} args the args
   * @returns {*} any
   */
  async publishSection(args) {
    const { id } = args;
    await this.db.tx((transaction) => {
      const contentDomain = new SectionContent({ ...this.context, db: transaction });
      return contentDomain.publish(id);
    });
    return id;
  }

  /**
   * Function to get the section
   * @param {object} args the args
   * @returns {*} any
   */
  getSection(args) {
    const { id } = args;
    const contentDomain = new SectionContent(this.context);
    return contentDomain.get(id);
  }

  /**
   * Function to get max order
   * @returns {*} any
   */
  async getMaxOrderSection() {
    const contentDomain = new SectionContent(this.context);
    const result = await contentDomain.getMaxOrder(tyContenuto.SEZIONI);
    return (result.order + 1) || 1;
  }

  /**
   * Function to get the section
   * @param {object} args the args
   * @returns {*} any
   */
  saveSection(args = {}) {
    return this.db.tx(async (transaction) => {
      const contentDomain = new SectionContent({ ...this.context, db: transaction });
      const isModify = await contentDomain.exist(args.id);
      if(isModify){
        return contentDomain.update({ ...args, type: tyContenuto.SEZIONI });
      }
      return contentDomain.create({ ...args, type: tyContenuto.SEZIONI });
    });
  }
}

