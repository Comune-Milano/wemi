import { logger } from 'utility/logger/getInstance';

import {
    selectTagsByServizio,
    selectTagsByFilter,
    selectServices,
    selectServicesTag,
    conditionHelper,
    conditionCategory,
    conditionTag,
    selectCategory,
    conditionServices,
    conditionServicesCategory,
} from 'sql/serviziogenerale/select';
import { insertTag } from 'sql/serviziogenerale/insert';
import { deleteTags } from 'sql/serviziogenerale/delete';
import { condition0_18_active } from 'sql/sharedConditions/condition0_18';
import { updateServizio } from 'sql/servizio/updateServizio';
import { insertServizio } from 'sql/servizio/insertServizio';

const TAGS_SEPARATOR = ';';

class ServizioDAO {
    /**
     * @param {db} indicates the connection object
     * @param db
     * @param helper
     * @param formatter
     */
  constructor(db, helper, formatter) {
    this.connection = db;
    this.helper = helper;
    this.formatter = formatter;
  }

  async findTagsByServizio(idServizio) {
    try {
      const risultato = this.connection.any(selectTagsByServizio, { idServizio });
      return risultato;
    }
    catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async findTagsByFilter(string = '') {
    try {
      const risultato = await this.connection.any(selectTagsByFilter, string.toLocaleLowerCase());
      return risultato.map(el => el.tx_tag_ricerca);
    }
    catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async findServices({
        idCategoria,
        tag,
        is0_18,
    }) {
    try {
      let selects = selectServices;
      const conditions = [];
      conditions.push(
                conditionHelper,
                conditionServices
            );

      if (is0_18) {
        conditions.push(this.formatter.format(condition0_18_active));
      }
      if (idCategoria) {
        conditions.push(this.formatter.format(conditionCategory, [idCategoria]));
        conditions.push(conditionServicesCategory);
      }
      if (tag) {
        selects = selectServicesTag;
        conditions.push(this.formatter.format(conditionTag, [tag.toLowerCase()]));
      }
      const query = selects + conditions.join(' ');
      const result = await this.connection.any(query);
            
      return result.map(service => ({
        serviceId: service.id_contenuto,
        name: service.tl_testo_1.it,
        categoryId: idCategoria,
        tag: service.tx_tag_ricerca,
      }));
    }
    catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async findCategory(idCategoria) {
    try {
      const result = await this.connection.oneOrNone(selectCategory, { idCategoria });
      return {
        categoryId: idCategoria,
        name: result.txTitoloCategoria.it,
        description: result.txDescrizioneCategoria ? result.txDescrizioneCategoria.it : undefined,
        media: result.oj_media,
      };
    }
    catch (error) {
      logger.error(error);
      throw error;
    }
  }

  updateService(content={}){
    return this.connection.none(updateServizio,  content );
  }

  insertService(content={}){
    return this.connection.none(insertServizio,  content );
  }

    /**
     * 
     * @param {*} idServizio 
     * @param {string} tagsString (tag1 ; tag2 ;...; tagn) 
     */
  async updateTags(idServizio, tagsString) {
    try {
      if (!tagsString) {
        return;
      }
            //creo la lista dei tag
      const newTags = tagsString.split(TAGS_SEPARATOR)
                .map(el => el.trim().toLocaleLowerCase())
                .filter(el => el);

            //estraggo dal db gli attuali tag del servizio e li mappo per creare una lista di stringhe
      const result = await this.findTagsByServizio(idServizio);
      const actualTags = result.map(el => el.tx_tag_ricerca);
            //lista dei tag presenti nel db, ma non in quelli nuovi (da rimuovere)
      const toRemove = actualTags.filter(el => !newTags.includes(el));

      const toAdd = newTags.filter(el => !actualTags.includes(el));

      if (toAdd.length > 0) {
        await this.connection.batch(toAdd.map(tag => this.connection.none(insertTag, {
          idServizio,
          tag,
        })));
      }
      if (toRemove.length > 0) {
        await this.connection.none(deleteTags, [toRemove, idServizio]);
      }

    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

}

export default ServizioDAO;