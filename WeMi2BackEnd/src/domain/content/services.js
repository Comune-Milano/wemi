import ServizioGeneraleDao from '../../dao/servizioGenerale/servizioGeneraleDAO';
import { ContentDomain } from './content';
import { ContenutoDAO } from 'dao/contenuto/contenutoDAO';
import { ContenutoSttDAO } from 'dao/contenutostt';
import { CONTENT_STATE } from 'constants/db/contentstate';
import { ContenutoAssociatoDAO } from 'dao/contenutoassociato';
import { tyContenuto } from 'constants/db/ty_contenuto';


/**
 * Class domain for content management
 */
export class ServiceContentDomain extends ContentDomain {
  /**
   * The constructor of the class
   * @param {object} context the graphql object for the context
   */
  constructor(context) {
    super(context);
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

    const contents = await contenutoDao.getContentServiceList(typeContent, {
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
      priceUnit: content.cd_unita_prezzo ? content.cd_unita_prezzo: undefined,
      tags: content.tx_tags_ricerca ? content.tx_tags_ricerca : '',
      accreditationCategory: content.id_categoria_accreditamento? content.id_categoria_accreditamento : undefined,
      startDate: content.dt_inizio_val,
      associates: (content.associates || []).filter(associate => !!associate).map(associate => ({ id: associate.id, title: associate.text1[this.locale], type: associate.type })),
      endDate: content.dt_fine_val,
      code: content.code,
    };
  }

  /**
   * Function to publish a content
   * @param {number} content the content
   * @returns {*} the result
   */
  async update(content = {}) {
    const contenutoDao = new ContenutoDAO(this.db, this.formatter, { builder: this.helpers });
    const contenutoAssociatoDao = new ContenutoAssociatoDAO(this.db, this.formatter, { builder: this.helpers });
    const servizioDao = new ServizioGeneraleDao(this.db);
    this.logger.trace('update-content', content);
    const contentResult = content;

    await this.shiftOrder(contentResult);
    
    await this.hasSameCode(contentResult);

    await contenutoDao.update({
      ...content,
      text1: content.title ? { [this.locale]: content.title } : undefined,
      text2: content.description ? { [this.locale]: content.description } : undefined,
      progressive: content.progressive || undefined,
    });

    await servizioDao.updateService(content);

    await servizioDao.updateTags(content.id, content.txTagsRicerca);

    
    await contenutoAssociatoDao.delete({ id: content.id });

    if(content.associates && content.associates.length){
      for(let i=0;i<content.associates.length;i++){
        if(content.associates[i].type === tyContenuto.CATEGORIE){
          await contenutoAssociatoDao.insert({...content, associates: [content.associates[i].id], relation: 'CL2'});
        }
        if(content.associates[i].type === tyContenuto.MANSIONI){
          await contenutoAssociatoDao.insert({...content, associates: [content.associates[i].id], relation: 'MC'});
        }
        if(content.associates[i].type === tyContenuto.TARGET_LIVELLO_1){
          await contenutoAssociatoDao.insert({...content, associates: [content.associates[i].id], relation: 'TL1'});
        }
      }
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
    const servizioDao = new ServizioGeneraleDao(this.db);
    const contenutoAssociatoDao = new ContenutoAssociatoDAO(this.db, this.formatter, { builder: this.helpers });
    const contenutosttDao = new ContenutoSttDAO({ db: this.db, formatter: this.formatter, builder: this.helpers });
    this.logger.trace('insert-content', content);

    await this.hasSameCode(content);

    const contentCreated = await contenutoDao.create({
      ...content,
      text1: content.title ? { [this.locale]: content.title } : undefined,
      text2: content.description ? { [this.locale]: content.description } : undefined,
      progressive: content.progressive || undefined,
    });

    const contentResult = { ...content, id: contentCreated.id };

    await this.shiftOrder(contentResult);

    await contenutosttDao.insert(
      {
        id: contentCreated.id,
        state: CONTENT_STATE.DRAFT,
      },
      this.user?.idUtente
    );

    await servizioDao.insertService({...content, id: contentCreated.id});

    await servizioDao.updateTags(contentCreated.id, content.txTagsRicerca);

    const contentAssociates = {...content, id: contentCreated.id};

    if(content.associates && content.associates.length){
      for(let i=0;i<content.associates.length;i++){
        if(content.associates[i].type === tyContenuto.CATEGORIE){
          await contenutoAssociatoDao.insert({...contentAssociates, associates: [content.associates[i].id], relation: 'CL2'});
        }
        if(content.associates[i].type === tyContenuto.MANSIONI){
          await contenutoAssociatoDao.insert({...contentAssociates, associates: [content.associates[i].id], relation: 'MC'});
        }
        if(content.associates[i].type === tyContenuto.TARGET_LIVELLO_1){
          await contenutoAssociatoDao.insert({...contentAssociates, associates: [content.associates[i].id], relation: 'TL1'});
        }
      }
    }


    return contentResult;
  }

}

