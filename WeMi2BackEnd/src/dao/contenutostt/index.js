import tabelle from 'tabelle';

/**
 * Class for the table content stt
 */
export class ContenutoSttDAO {
  /**
   * The constructor of the class
   * @param {*} connectionObject the db object
   */
  constructor(connectionObject = {}) {
    const { db, formatter, locale, builder } = connectionObject;
    this.connection = db;
    this.formatter = formatter;
    this.locale = locale;
    this.builder = builder;
    this.tableName = {
      table: tabelle.contenuto_stt,
    };
  }

  /**
   * The method to find the content information by type
   * @param {object} content the identifier
   * @param {number} content.id the identifier
   * @param {number} content.state the state
   * @param {number} userId the user identifier
   * @returns {*} of content
   */
  insert(content = {}, userId) {
    const { ColumnSet: ClassColumnSet } = this.builder;
    const columns = [
      {
        name: 'id_contenuto',
        prop: 'id',
      },
      {
        name: 'cd_stato_contenuto',
        prop: 'state',
      },
      {
        name: 'id_utente',
        prop: 'userId',
      },
      {
        name: 'ts_variazione_stato',
        mod: '^',
        def: 'localtimestamp',
      },

    ];
    const columnSet = new ClassColumnSet(columns, this.tableName);
    const insertQuery = this.builder.insert({ ...content, userId }, columnSet);
    return this.connection.one(`
      ${insertQuery}
      RETURNING id_contenuto as "id";
    `);
  }

}
