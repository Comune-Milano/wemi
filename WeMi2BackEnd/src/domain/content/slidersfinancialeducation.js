import { ContentDomain } from './content';
import { ContenutoDAO } from 'dao/contenuto/contenutoDAO';
import { ContenutoSttDAO } from 'dao/contenutostt';
import { CONTENT_STATE } from 'constants/db/contentstate';
import { MediaDao } from 'dao/media/media';
import { deleteFile } from 'utility/deleteFile';
import { saveFileFromBase64 } from 'utility/saveFileFromBase64';
import { tyContenuto } from 'constants/db/ty_contenuto';


/**
 * Class domain for content management
 */
export class SliderFinancialEducationContentDomain extends ContentDomain {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   */
  constructor(context) {
    super(context);
  }

  /**
   * the method to get the content
   * @param {number} id the identifier
   * @returns {object} the content
   */
  async get(id) {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter);
    const content = await contenutoDao.getById(id);
    if (!content) {
      return null;
    }
    return {
      id: content.id_contenuto,
      title: content.tl_testo_1 ? content.tl_testo_1[this.locale] : '',
      description: content.tl_testo_2 ? content.tl_testo_2[this.locale] : '',
      image: {
        path: content.media1?.path,
        name: content.media1?.name,
        mime: content.media1?.mime,
        id: content.media1?.id,
      },
      link: content.ln_link_1,
      progressive: content.nr_ordine_visualizzazione,
      version: content.pg_versione,
      startDate: content.dt_inizio_val,
      endDate: content.dt_fine_val,
      code: content.code,
    };
  }

  /**
   * the method to get the content
   * @param {number} id the identifier
   * @returns {object} the content
   */
  async getMaxOrderTextualValuesSlider() {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter);
    const content = await contenutoDao.getMaxOrderTextualValues(tyContenuto.SLIDER_EDUCAZIONE_FINANZIARIA);
    if (!content) {
      return null;
    }
    return {
      title: content.tl_testo_1 ? content.tl_testo_1[this.locale] : '',
      description: content.tl_testo_2 ? content.tl_testo_2[this.locale] : '',
      order: content.nr_ordine_visualizzazione ? content.nr_ordine_visualizzazione + 1 : 1,
    };
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
   * @param {number} content the content
   * @returns {*} the result
   */
  async update(content = {}) {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter, { builder: this.helpers });
    const mediaDao = new MediaDao(this.db, this.helpers, this.formatter);
    this.logger.trace('update-content', content);
    const contentDB = await contenutoDao.getById(content.id);

    let newMedia;

    const hasNewImageToUpload = content.image && content.image?.id !== contentDB?.media1?.id;
    this.logger.trace('has to insert new image', hasNewImageToUpload);
    if (hasNewImageToUpload) {
      newMedia = await mediaDao.insertMedia(content.image);
      const fileName = `${newMedia.id}_${content.image.name}`;
      await saveFileFromBase64(this.mediaPath, fileName, content.image.blob);
    }

    this.logger.trace('updating content', content, newMedia);

    const contentResult = content;

    await this.shiftOrder(contentResult);
    
    await this.hasSameCode(contentResult);

    await contenutoDao.updateByContentType({
      title: content.title ? { [this.locale]: content.title } : undefined,
      description: content.description ? { [this.locale]: content.description } : undefined,
    }, tyContenuto.SLIDER_EDUCAZIONE_FINANZIARIA, content.id);

    await contenutoDao.update({
      ...content,
      text1: content.title ? { [this.locale]: content.title } : undefined,
      text2: content.description ? { [this.locale]: content.description } : undefined,
      media1: hasNewImageToUpload ? (newMedia?.id || null) : undefined,
      progressive: content.progressive || undefined,
    });


    if (contentDB?.media1?.id && content.image?.id !== contentDB.media1?.id) {
      const oldMedia = await mediaDao.findById({ id: contentDB.media1.id });
      this.logger.trace('deleting old media content', oldMedia);
      const oldAttachmentName = `${oldMedia.id}_${oldMedia.name}`;
      await deleteFile(this.mediaPath, oldAttachmentName);
      await mediaDao.deleteMedia({ id: contentDB.media1.id });
    }

    return contentResult;
  }

  /**
   * Function to publish a content
   * @param {number} content the content
   * @returns {*} the result
   */
  async create(content = {}) {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter, { builder: this.helpers });
    const mediaDao = new MediaDao(this.db, this.helpers, this.formatter);
    const contenutosttDao = new ContenutoSttDAO({ db: this.db, formatter: this.formatter, builder: this.helpers });
    this.logger.trace('insert-content', content);

    let newMedia;

    if (content.image) {
      newMedia = await mediaDao.insertMedia(content.image);
      const fileName = `${newMedia.id}_${content.image.name}`;
      await saveFileFromBase64(this.mediaPath, fileName, content.image.blob);
    }
    await contenutoDao.updateByContentType({
      title: content.title ? { [this.locale]: content.title } : undefined,
      description: content.description ? { [this.locale]: content.description } : undefined,
    }, tyContenuto.SLIDER_EDUCAZIONE_FINANZIARIA);

    const contentCreated = await contenutoDao.create({
      ...content,
      media1: newMedia?.id || null,
      text1: content.title ? { [this.locale]: content.title } : undefined,
      text2: content.description ? { [this.locale]: content.description } : undefined,
      link1: content.link || undefined,
      progressive: content.progressive || undefined,
    });

    const contentResult = { ...content, id: contentCreated.id };

    await this.shiftOrder(contentResult);

    await this.hasSameCode(contentResult);

    await contenutosttDao.insert(
      {
        id: contentCreated.id,
        state: CONTENT_STATE.DRAFT,
      },
      this.user?.idUtente
    );
    return contentResult;
  }

}
