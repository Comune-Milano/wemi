import tabelle from 'tabelle';
import { whereClauseTypeContent, orderClauseAlphabeticContent, selectContentList, orderClauseIdentifierContent, limitClauseContent, whereClauseSearchStateContent, whereClauseSearchDescriptionContent, selectListContent, whereClauseSearchCodeContent, orderClauseVisualizationOrderContent, selectListServiceContent, whereClauseSearchCategoryContent } from 'sql/contenuto';
import { ORDER_CONTENT } from 'domain/content/content';

/**
 * Class for the formatting of contents
 */
export class ContentFormatter {
  /**
   * The constructor of the class
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(builder, formatter) {
    this.builder = builder;
    this.formatter = formatter;
    this.tableName = {
      table: tabelle.contenuto,
    };
  }

  /**
   * The function to format get list of contents
   * @param {*} parameters the parameters
   * @param {*} locale the language
   * @returns {string} the formatted string
   */
  getList(parameters, locale) {
    const { filters, offset, elementsPerPage } = parameters;

    const description = filters.description ? `%${filters.description}%` : null;

    const code = filters.code ? `%${filters.code}%` : null;

    const whereClause = [];

    if(!filters.noConditions){
      whereClause.push(whereClauseTypeContent);
    }

    let limitClause = '';

    if (offset >= 0 && elementsPerPage >= 0) {
      limitClause = limitClauseContent;
    }

    if (description) {
      whereClause.push(this.formatter.format(
        whereClauseSearchDescriptionContent,
        { description, locale }
      ));
    }

    if (filters.state) {
      whereClause.push(this.formatter.format(whereClauseSearchStateContent, {
        state: filters.state,
      }));
    }

    if (code) {
      whereClause.push(this.formatter.format(whereClauseSearchCodeContent, {
        code,
      }));
    }

    let orderClause = orderClauseIdentifierContent;

    if (filters.order === ORDER_CONTENT.ID) {
      orderClause = orderClauseIdentifierContent;
    }

    if (filters.order === ORDER_CONTENT.DESCRIPTION) {
      orderClause = orderClauseAlphabeticContent;
    }

    if (filters.order === ORDER_CONTENT.PROGRESSIVE) {
      orderClause = orderClauseVisualizationOrderContent;
    }

    const formattedSelect = filters.noConditions ? 
        `${selectListContent}
         ORDER BY ${orderClause} 
         ${limitClause}; ` : 
         `${selectListContent}
         WHERE ${whereClause.join(' ')}
         ORDER BY ${orderClause} 
         ${limitClause}; `;
    
    return formattedSelect;
  }

/**
 * The function to format get list of contents
 * @param {*} parameters the parameters
 * @param {*} locale the language
 * @returns {string} the formatted string
 */
  getContentServiceList(parameters, locale) {
    const { filters, offset, elementsPerPage } = parameters;

    const description = filters.description ? `%${filters.description}%` : null;

    const code = filters.code ? `%${filters.code}%` : null;

    const whereClause = [];

    whereClause.push(whereClauseTypeContent);

    let limitClause = '';

    if (offset >= 0 && elementsPerPage >= 0) {
      limitClause = limitClauseContent;
    }

    if (description) {
      whereClause.push(this.formatter.format(
      whereClauseSearchDescriptionContent,
      { description, locale }
    ));
    }

    if (filters.state) {
      whereClause.push(this.formatter.format(whereClauseSearchStateContent, {
        state: filters.state,
      }));
    }

    if (code) {
      whereClause.push(this.formatter.format(whereClauseSearchCodeContent, {
        code,
      }));
    }

    let orderClause = orderClauseIdentifierContent;

    if (filters.order === ORDER_CONTENT.ID) {
      orderClause = orderClauseIdentifierContent;
    }

    if (filters.order === ORDER_CONTENT.DESCRIPTION) {
      orderClause = orderClauseAlphabeticContent;
    }

    if (filters.order === ORDER_CONTENT.PROGRESSIVE) {
      orderClause = orderClauseVisualizationOrderContent;
    }

    const formattedSelect = `
    ${selectListServiceContent}
    WHERE ${whereClause.join(' ')}
    ORDER BY ${orderClause} 
    ${limitClause}
    ;
  `;
  
    return formattedSelect;
  }

  /**
   * The function to format get list of contents
   * @param {*} parameters the parameters
   * @returns {string} the formatted string
   */
  getContentList(parameters) {
    const { filters } = parameters;

    const whereClause = [];
    whereClause.push(whereClauseTypeContent);

    if (filters.state) {
      whereClause.push(this.formatter.format(whereClauseSearchStateContent, {
        state: filters.state,
      }));
    }

    const formattedSelect = `
    ${selectContentList}
    WHERE ${whereClause.join(' ')}
    ORDER BY c.nr_ordine_visualizzazione 
    ;`;
    return formattedSelect;
  }

  /**
   * The method to format the content
   * @param {*} content the content
   * @returns {string} the string formatted
   */
  insert(content = {}) {
    const { ColumnSet: ClassColumnSet } = this.builder;
    const columns = [
      {
        name: 'id_contenuto',
        mod: '^',
        def: 'nextval(\'seq_contenuto\')',
      },
      {
        name: 'ty_contenuto',
        prop: 'type',
      },
      {
        name: 'id_contenuto_rif',
        mod: '^',
        def: 'currval(\'seq_contenuto\')',
      },
      {
        name: 'ty_sottotipo_contenuto',
        prop: 'subtype',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'cd_contenuto',
        prop: 'code',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'nr_ordine_visualizzazione',
        prop: 'progressive',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'pg_versione',
        prop: 'version',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_1',
        prop: 'text1',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_2',
        prop: 'text2',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_3',
        prop: 'text3',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_4',
        prop: 'text4',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_5',
        prop: 'text5',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'ln_link_1',
        prop: 'link1',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'ln_link_2',
        prop: 'link2',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'id_media1',
        prop: 'media1',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'id_media2',
        prop: 'media2',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'id_media3',
        prop: 'media3',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'dt_inizio_val',
        prop: 'startDate',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'dt_fine_val',
        prop: 'endDate',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'js_dati_contenuto',
        prop: 'editorContent',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'ts_creazione',
        mod: '^',
        def: 'localtimestamp',
      },

    ];
    const columnSet = new ClassColumnSet(columns, this.tableName);
    const insertQuery = this.builder.insert({
      subtype: content.subtype,
      progressive: content.progressive,
      version: content.version || 1,
      text1: content.text1,
      text2: content.text2,
      text3: content.text3,
      text4: content.text4,
      text5: content.text5,
      link1: content.link1,
      link2: content.link2,
      media1: content.media1,
      media2: content.media2,
      media3: content.media3,
      startDate: content.startDate || new Date(),
      endDate: content.endDate || new Date('9999-12-31'),
      editorContent: content.editorContent || {},
      type: content.type,
      code: content.code,
    }, columnSet);
    return `
      ${insertQuery}
      RETURNING id_contenuto as "id"
    `;
  }

  /**
   * method to format update of contents
   * @param {object} content the content
   * @returns {string} the query formatted
   */
  update(content = {}) {
    const { ColumnSet: ClassColumnSet } = this.builder;
    const columns = [
      {
        name: 'ty_contenuto',
        prop: 'type',
      },
      {
        name: 'ty_sottotipo_contenuto',
        prop: 'subtype',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'nr_ordine_visualizzazione',
        prop: 'progressive',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'pg_versione',
        prop: 'version',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_1',
        prop: 'text1',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_2',
        prop: 'text2',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_3',
        prop: 'text3',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_4',
        prop: 'text4',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_5',
        prop: 'text5',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'ln_link_1',
        prop: 'link1',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'ln_link_2',
        prop: 'link2',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'id_media1',
        prop: 'media1',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'id_media2',
        prop: 'media2',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'id_media3',
        prop: 'media3',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'dt_inizio_val',
        prop: 'startDate',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'dt_fine_val',
        prop: 'endDate',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'js_dati_contenuto',
        prop: 'editorContent',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'cd_contenuto',
        prop: 'code',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'ts_creazione',
        mod: '^',
        def: 'localtimestamp',
      },

    ];
    const columnSet = new ClassColumnSet(columns, this.tableName);
    const insertQuery = this.builder.update({
      subtype: content.subtype,
      progressive: content.progressive,
      version: content.version || 1,
      text1: content.text1,
      text2: content.text2,
      text3: content.text3,
      text4: content.text4,
      text5: content.text5,
      link1: content.link1,
      link2: content.link2,
      media1: content.media1,
      media2: content.media2,
      media3: content.media3,
      startDate: content.startDate || new Date(),
      endDate: content.endDate || new Date('9999-12-31'),
      editorContent: content.editorContent,
      type: content.type,
      code: content.code,
    }, columnSet);
    return `
      ${insertQuery}
      WHERE id_contenuto = $[id];
    `;
  }

  /**
   * method to format update title,description of contents
   * @param {object} content the content
   * @param id
   * @returns {string} the query formatted
   */
  updateByContentType(content = {}, id) {
    const { ColumnSet: ClassColumnSet } = this.builder;
    const columns = [
     
      {
        name: 'tl_testo_1',
        prop: 'title',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tl_testo_2',
        prop: 'description',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      

    ];
    const columnSet = new ClassColumnSet(columns, this.tableName);
    const insertQuery = this.builder.update({
      title: content.title,
      description: content.description,
    }, columnSet);
    if(id){
      return `
      ${insertQuery}
      WHERE ty_contenuto = $[tyContenuto] AND id_contenuto != $[id];
    `;
    } else return `
    ${insertQuery}
    WHERE ty_contenuto = $[tyContenuto];
  `;
  }
}
