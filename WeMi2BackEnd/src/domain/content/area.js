import { ContentDomain } from './content';
import { ContenutoDAO } from 'dao/contenuto/contenutoDAO';
import { ContenutoAssociatoDAO } from 'dao/contenutoassociato';
import { ContenutoSttDAO } from 'dao/contenutostt';
import { CONTENT_STATE } from 'constants/db/contentstate';


/**
 * Class domain for content management
 */
export class AreaContentDomain extends ContentDomain {
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
      progressive: content.nr_ordine_visualizzazione,
      version: content.pg_versione,
      startDate: content.dt_inizio_val,
      endDate: content.dt_fine_val,
      code: content.code,
      associates: (content.associates || []).filter(associate => !!associate).map(associate => ({ id: associate.id, title: associate.text1[this.locale] })),
    };
  }

  /**
   * Function to update a content
   * @param {number} content the content
   * @returns {*} the result
   */
  async update(content = {}) {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter, { builder: this.helpers });
    
    const contenutoAssociatoDao = new ContenutoAssociatoDAO(this.db, this.formatter, { builder: this.helpers });

    const contentResult = content;

    await this.shiftOrder(contentResult);
    
    await this.hasSameCode(contentResult);

    await contenutoDao.update({
      ...content,
      text1: content.title ? { [this.locale]: content.title } : undefined,
      text2: content.description ? { [this.locale]: content.description } : undefined,
      link1: content.link || undefined,
      progressive: content.progressive || undefined,
    });

    const mappedInputContent = { ...content, associates: content.sections, relation: 'SEZ' };
    
    await contenutoAssociatoDao.delete(mappedInputContent);

    if(mappedInputContent.associates?.length > 0) {
      await contenutoAssociatoDao.insert(mappedInputContent);
    }

    return content;
  }

  /**
   * Function to create a content
   * @param {number} content the content
   * @returns {*} the result
   */
  async create(content = {}) {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter, { builder: this.helpers });

    const contenutoAssociatoDao = new ContenutoAssociatoDAO(this.db, this.formatter, { builder: this.helpers });

    const contenutosttDao = new ContenutoSttDAO({ db: this.db, formatter: this.formatter, builder: this.helpers });

    await this.hasSameCode(content);

    const contentCreated = await contenutoDao.create({
      ...content,
      text1: content.title ? { [this.locale]: content.title } : undefined,
      text2: content.description ? { [this.locale]: content.description } : undefined,
      link1: content.link || undefined,
      progressive: content.progressive || undefined,
    });

    const contentResult = { ...content, associates: content.sections, id: contentCreated.id, relation: 'SEZ' };

    if(contentResult.associates?.length > 0) {
      await contenutoAssociatoDao.insert(contentResult);
    }

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

