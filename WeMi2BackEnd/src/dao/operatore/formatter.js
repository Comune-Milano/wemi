import tabelle from 'tabelle';

/**
 * The class to define the formatter for operators on institutions
 */
export class OperatorInstitutionFormatter {
  /**
   * The constructor of the class
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(builder, formatter) {
    this.builder = builder;
    this.formatter = formatter;
    const tableName = {
      table: tabelle.r_operatore_ente,
    };
    this.tableName = tableName;
  }
  /**
   * Method to format the columns for the authorized operator update
   * @param {object[]} operators operators to delete for institution
   * @param {number} institutionId institution id to delete for institution
   * @returns {string} object to describe the column set for r_operatore_ente
   */
  formatInsert(operators = [], institutionId) {
    const columnsROperators = [
      {
        name: 'id_ente',
        prop: 'institutionId',
      },
      {
        name: 'id_utente',
        prop: 'id',
      },
    ];

    const { ColumnSet: ClassColumnSet } = this.builder;

    const columnSet = new ClassColumnSet(columnsROperators, this.tableName);

    const queryInsert = this.builder.insert(operators.map(operator => ({
      id: operator,
      institutionId,
    })), columnSet);

    const query = this.formatter.format(`${queryInsert}
    RETURNING 
      id_utente as "id", id_ente as "institutionId"
    `);
    return query;
  }
  /**
   * Method to format the columns for the authorized operator update
   * @param {number[]} operators operators to delete for institution
   * @param {number} institutionId institution id to delete for institution
   * @returns {string} object to describe the column set for r_operatore_ente
   */
  formatDelete(operators = [], institutionId) {

    const query = this.formatter.format(`
      DELETE FROM ${this.tableName.table}
      WHERE id_utente IN ($[users:list]) AND id_ente = $[institutionId]
    `, {
      users: operators,
      institutionId,
    });

    return query;
  }
}