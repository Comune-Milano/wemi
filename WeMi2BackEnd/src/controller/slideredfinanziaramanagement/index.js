import path from 'path';
import { STORAGE_BOUND_PATH } from 'environment';
import { CONTENT_STATE } from 'constants/db/contentstate';
import { tyContenuto } from 'constants/db/ty_contenuto';
import { SliderFinancialEducationContentDomain } from 'domain/content/slidersfinancialeducation';

/**
 * Class controller for content management
 */
export class SliderFinancialEducationContentManagement {
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
   * Function to get the list of slider
   * @param {object} args the arguments of the query
   * @returns {object[]} the list of slider
   */
  async getSlidersFinancialEducation(args) {
    const { filters = {}, page, elementsPerPage } = args;
    return this.db.task((task) => {
      const contentDomain = new SliderFinancialEducationContentDomain({ ...this.context, db: task });
      return contentDomain.getList({
        page,
        filters,
        elementsPerPage,
        type: tyContenuto.SLIDER_EDUCAZIONE_FINANZIARIA,
      });
    });
  }
  /**
   * Method to disable the slider
   * @param {object} args the args
   * @returns {*} any
   */
  async disableSlider(args) {
    const { id } = args;
    await this.db.tx((transaction) => {
      const contentDomain = new SliderFinancialEducationContentDomain({ ...this.context, db: transaction });
      return contentDomain.disable(id);
    });
    return id;
  }

  /**
   * Method to publish the slider
   * @param {object} args the args
   * @returns {*} any
   */
  async publishSlider(args) {
    const { id } = args;
    await this.db.tx((transaction) => {
      const contentDomain = new SliderFinancialEducationContentDomain({ ...this.context, db: transaction });
      return contentDomain.publish(id);
    });
    return id;
  }

  /**
   * Function to get the slider
   * @param {object} args the args
   * @returns {*} any
   */
  async getSliderFinancialEducation(args) {
    const { id } = args;
    const contentDomain = new SliderFinancialEducationContentDomain(this.context);
    return contentDomain.get(id);
  }

  /**
   * Function to get textual values of the slider
   * @param {object} args the args
   * @returns {*} any
   */
  async getMaxOrderTextualValuesSlider() {
    const contentDomain = new SliderFinancialEducationContentDomain(this.context);
    return contentDomain.getMaxOrderTextualValuesSlider();
  }

  /**
   * Function to save the slider
   * @param {object} args the args
   * @returns {*} any
   */
  saveSlider(args = {}) {
    return this.db.tx(async (transaction) => {
      const contentDomain = new SliderFinancialEducationContentDomain({ ...this.context, db: transaction });
      const isModify = await contentDomain.exist(args.id);
      if(isModify){
        return contentDomain.update({ ...args, type: tyContenuto.SLIDER_EDUCAZIONE_FINANZIARIA });
      }
      return contentDomain.create({ ...args, type: tyContenuto.SLIDER_EDUCAZIONE_FINANZIARIA });
    });
  }

  /**
   * Function to get the list of sliders
   * @param {object} args the args
   * @returns {object[]} the list of sections
   */
  async estraiSliderEducazioneFinanziaria(args) {
    return this.db.task((task) => {
      const contentDomain = new SliderFinancialEducationContentDomain({ ...this.context, db: task });
      return contentDomain.getContentList({
        filters: {state : CONTENT_STATE.PUBLISHED},
        type: tyContenuto.SLIDER_EDUCAZIONE_FINANZIARIA,
      });
    });
  }
}

