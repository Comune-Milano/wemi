import tabelle from 'tabelle';

/**
 * Class for the table content associate
 */
export class ContenutoAssociatoDAO {
  /**
   * The constructor of the class
   * @param {*} db the db object
   * @param {*} formatter the formatter
   * @param {*} contextInformation the context information
   */
  constructor(db, formatter, contextInformation = {}) {
    this.connection = db;
    this.formatter = formatter;
    this.locale = contextInformation.locale;
    this.builder = contextInformation.builder;
    this.tableName = {
      table: tabelle.contenuto_associato,
    };
  }

  /**
   * The method to find the content information by type
   * @param {object} content the identifier
   * @returns {*} of content
   */
  insert(content = {}) {
    const { ColumnSet: ClassColumnSet } = this.builder;
    const columns = [
      {
        name: 'id_contenuto_primario',
        prop: 'id',
      },
      {
        name: 'id_contenuto_associato',
        prop: 'idAssociate',
      },
      {
        name: 'nm_relazione',
        prop: 'relation',
      },
      {
        name: 'ts_creazione',
        mod: '^',
        def: 'localtimestamp',
      },

    ];
    const columnSet = new ClassColumnSet(columns, this.tableName);
    
    const { associates: contentAssociates = [], id, relation } = content;
    const associates = contentAssociates.map(idContentAssociate => ({
      id,
      idAssociate: idContentAssociate,
      relation,
    }));

    const insertQuery = this.builder.insert(associates, columnSet);
    return this.connection.multi(`
      ${insertQuery}
      RETURNING id_contenuto_primario as "id";
    `);
  }

  /**
   * The method to find the content information by type
   * @param {object} content the identifier
   * @returns {*} of content
   */
  delete(content = {}) {
    const { id } = content;
    return this.connection.none(`
      DELETE FROM wemi2.${this.tableName.table}
      WHERE id_contenuto_primario = $[id];
    `, { id });
  }

}
