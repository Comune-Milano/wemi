import { CITTADINO, LAVORATORE } from 'constants/usercode';
import { TY_OPERATORE_ENTE } from 'constants/userroles';
import { 
  codeFilterMulti,
  codeFilter, 
  conditionBasic, 
  dataDalFilter,
  dataAlFilter, 
  descriptionFilter, 
  emailFilter,
  nameFilter, 
  surnameFilter,
  limitQuery,
  usernameFilter,
} from 'sql/utente/selectUtenti';
import tabelle from 'tabelle';

/**
 * The class to define the formatter for operators on institutions
 */
export class UserFormatter {
  /**
   * The constructor of the class
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(builder, formatter) {
    this.builder = builder;
    this.formatter = formatter;
    const tableName = {
      table: tabelle.utente,
    };
    this.tableName = tableName;
  }
  /**
   * Formats the insert into the table user
   * @param {object[]} operators the operators to insert
   * @returns {string} formatted string query
   */
  formatInsert(operators) {
    const columnsUser = [
      {
        name: 'id_utente',
        mod: '^',
        def: 'nextval(\'seq_utente\')',
      },
      {
        name: 'cd_profilo_utente',
        def: CITTADINO,
      },
      {
        name: 'ty_operatore_ente',
        mod: '^',
        def: TY_OPERATORE_ENTE,
      },
      {
        name: 'fg_lavoratore',
        mod: '^',
        def: 0,
      },
      {
        name: 'ptx_email',
        prop: 'email',
      },
      {
        name: 'ptx_username',
        prop: 'email',
      },
      {
        name: 'ts_ultima_modifica',
        mod: '^',
        def: 'localtimestamp',
      },
      {
        name: 'ts_creazione',
        mod: '^',
        def: 'localtimestamp',
      },
    ];
    const { ColumnSet: ClassColumnSet } = this.builder;

    const columnSetUsers = new ClassColumnSet(columnsUser, this.tableName);
    const queryUsers = this.builder.insert(
      operators.map(operator => ({ email: operator.email })),
      columnSetUsers
    );
    const queryFormatted = this.formatter.format(`
      ${queryUsers}
      RETURNING id_utente as id
    `);
    return queryFormatted;
  }
  /**
   * Method to format the conditions for findUsers
   * @param {object} filters filter object
   * @param {object} limit limit object
   * @returns {string} the query string
   */
  formatSelectFindUsers(filters, limit){
    const conditions = [];
    conditions.push(conditionBasic);
    if(filters.surname){
      conditions.push(this.formatter.format(surnameFilter, { filters }));
    }
    if(filters.name){
      conditions.push(this.formatter.format(nameFilter, { filters }));
    }
    if(filters.email){
      conditions.push(this.formatter.format(emailFilter, { filters }));
    }
    if(filters.profileDescription){
      conditions.push(this.formatter.format(descriptionFilter, { filters }));
    }
    if(filters.username){
      conditions.push(this.formatter.format(usernameFilter, { filters }));
    }
    if(filters.profileCode){
      const isCittadino = filters.profileCode === CITTADINO;
      const profileCode = isCittadino? [CITTADINO, LAVORATORE] : filters.profileCode;
      const query = isCittadino? codeFilterMulti : codeFilter;
      conditions.push(this.formatter.format(query, { filters: { ...filters, profileCode } }));
    }
    if(filters.startDate){
      conditions.push(this.formatter.format(dataDalFilter, { filters }));
    }
    if(filters.endDate){
      conditions.push(this.formatter.format(dataAlFilter, { filters }));
    } 
    return { 
      conditions: conditions.join(' '), 
      limitQuery: this.formatter.format(limitQuery, { limit }),
    };
  }
  /**
   * Method to format the columns for the authorized operator update
   * @param {object[]} operators array of operators
   * @param {number} tyOperator type of the operator
   * @returns {string} the query string
   */
  formatUpdate(operators, tyOperator) {
    const columns = [
      {
        name: 'ty_operatore_ente',
        prop: 'type',
      },
    ];

    const { ColumnSet: ClassColumnSet } = this.builder;

    const columnSet = new ClassColumnSet(columns, this.tableName);

    const queryUpdate = this.builder.update(operators.map(() => ({
      type: tyOperator,
    })), columnSet);

    const query = this.formatter.format(`${queryUpdate} 
      WHERE id_utente IN ($[operators:list])
    `, {
      operators: operators.map(operator => operator.id),
    });

    return query;
  }
}