/**
 * The class to define the formatter for user profile table
 */
export class UserProfileFormatter {
  /**
   * The constructor of the class
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(builder, formatter) {
    this.builder = builder;
    this.formatter = formatter;
    const tableName = {
      table: 'r_utente_profilo',
    };
    this.tableName = tableName;
  }
  /**
   * Method to format the columns for the user profile table
   * @param {object} properties the properties
   * @returns {string} the query string
   */
  formatUpdate(properties = {}) {
    const columns = [
      {
        name: 'dt_inizio_val',
        prop: 'startValidityDate',
        skip: col => !col.exists,
      },
      {
        name: 'dt_fine_val',
        prop: 'endValidityDate',
        skip: col => !col.exists,
      },
      {
        name: 'id_utente_ultima_modifica',
        prop: 'idUserMod',
        skip: col => !col.exists,
      },
      {
        name: 'ts_ultima_modifica',
        mod: '^',
        def: 'localtimestamp',
      }
    ];

    const { ColumnSet: ClassColumnSet } = this.builder;

    const columnSet = new ClassColumnSet(columns, this.tableName);
    const queryUpdate = this.builder.update(properties, columnSet);

    const query = this.formatter.format(`${queryUpdate} 
      WHERE id_utente = $[user.idUtente] and cd_profilo = $[user.profile];
    `);

    return query;
  }
  /**
   * Method to format the columns for the user profile table
   * @param {string} profile the new profile of the users
   * @param {object} user the last user
   * @returns {string} the query string
   */
  formatUpdates(profile, user){
    const columns = [
      {
        name: 'id_utente',
        prop:'id_utente',
        skip: col => !col.exists,
      },
      {
        name: 'cd_profilo',
        prop:'code',
      },
      {
        name: 'dt_inizio_val',
        mod: '^',
        def: 'current_date',
      },
      {
        name: 'id_utente_ultima_modifica',
        prop: 'idUtente',
      },
      {
        name: 'ts_ultima_modifica',
        mod: '^',
        def: 'localtimestamp',
      },
    ];

    const { ColumnSet: ClassColumnSet } = this.builder;

    const columnSetUsers = new ClassColumnSet(columns, this.tableName);

    const queryUpdate = this.builder.update({idUtente: user.idUtente, code:profile}, columnSetUsers);

    const query = this.formatter.format(`${queryUpdate} 
      WHERE id_utente IN ($[usersId:list]) and cd_profilo = $[profile];
    `);

    return query;
  }
  /**
   * Formats the insert into the table r_utente_profilo
   * @param {object[]} users the users to insert
   * @param {object} user the user that made the last modify
   * @returns {string} formatted string query
   */
  formatInsert(users, user){
    const columnsUser = [
      {
        name: 'id_utente',
        prop:'id_utente',
      },
      {
        name: 'cd_profilo',
        prop:'code',
      },
      {
        name: 'dt_inizio_val',
        mod: '^',
        def: 'current_date',
      },
      {
        name: 'id_utente_ultima_modifica',
        prop: 'idUtente',
      },
      {
        name: 'ts_ultima_modifica',
        mod: '^',
        def: 'localtimestamp',
      },
    ];

    const { ColumnSet: ClassColumnSet } = this.builder;

    const columnSetUsers = new ClassColumnSet(columnsUser, this.tableName);

    const queryUsers = this.builder.insert(
      users.map(userToInsert => ({ id_utente: userToInsert.id, idUtente: user.idUtente, code: userToInsert.code })),
      columnSetUsers, 
    );

    return queryUsers;
  }
}