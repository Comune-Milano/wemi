import tabelle from 'tabelle';
import { TY_SEDE } from 'constants/db/sede';

/**
 * The class to define the formatter for office on institutions
 */
export class OfficeInstitutionFormatter {
  /**
   * The constructor of the class
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(builder, formatter){
    this.builder = builder;
    this.formatter = formatter;
    const tableName = {
      table: tabelle.sede_ente,
    };
    this.tableName = tableName;
  }
  /**
   * Method to format the columns for insert of an office
   * @param {object} offices the offices to store
   * @param {number} institutionId the id of the institution
   * @returns {string} the insert query
   */
  formatInsert(offices = { officeType: TY_SEDE.PRIMARIA, officeArray: [] }, institutionId) {
    const columns = [
      {
        name: 'id_sede',
        prop: 'officeId',
        mod: '^',
        def: 'nextval(\'seq_sede_ente\')',
      },
      {
        name: 'id_ente_rif',
        prop: 'institutionId',
      },
      {
        name: 'ty_sede',
        prop: 'officeType',
      },
      {
        name: 'js_sede',
        prop: 'office',
        mod: ':json',
      },
      {
        name: 'ts_creazione',
        mod: '^',
        def: 'localtimestamp',
      },
    ];

    const { ColumnSet: ClassColumnSet } = this.builder;

    const columnSet = new ClassColumnSet(columns, this.tableName);

    const queryInsert = this.builder.insert(offices.officeArray.map(office => ({
      office: {
        nomeSede: office.name,
        indirizzo: office.address,
      },
      officeType: offices.officeType,
      institutionId,
    })), columnSet);

    const queryFormatted = this.formatter.format(`
    ${queryInsert}
    RETURNING id_ente_rif as "institutionId"
    `);
    return queryFormatted;
  }
  /**
   * Method to format the columns for update of an office
   * @param {object} offices the offices to store
   * @param {number} institutionId the id of the institution
   * @returns {string} the update query
   */
  formatUpdate(offices = { office: {}, officeType: 1 }, institutionId) {
    const columns = [
      {
        name: 'js_sede',
        prop: 'office',
        mod: ':json',
      },
    ];

    const { ColumnSet: ClassColumnSet } = this.builder;

    const columnSet = new ClassColumnSet(columns, this.tableName);
    const { office, officeType } = offices;
    const officeMapped = {
      office: {
        nomeSede: office.name,
        indirizzo: office.address,
      },
    };
     
    const queryUpdate = this.builder.update(officeMapped, columnSet);

    const queryFormatted = this.formatter.format(`
    ${queryUpdate}
    WHERE id_ente_rif = $[institutionId] 
      and ty_sede = $[officeType]
      ${officeType === 2 ? 'and id_sede = $[id]' : ''}
    RETURNING id_ente_rif as "institutionId"
    `, {
      officeType: offices.officeType,
      institutionId,
      id: office.id,
    });
    return queryFormatted;
  }
  /**
   * Method to format the columns for delete of an office
   * @param {object} offices the offices to store
   * @param {number} institutionId the id of the institution
   * @returns {string} the delete query
   */
  formatDelete(offices = { officeType: 1, officeArray: [] }, institutionId) {
    const { officeArray } = offices;
    const officeMapped = officeArray.map(office => (office.id));
    
    const queryFormatted = this.formatter.format(`
    DELETE FROM ${this.tableName.table}
    WHERE id_ente_rif = $[institutionId] 
      and ty_sede = $[officeType] and id_sede IN ($[officesId:list])
    RETURNING id_ente_rif as "institutionId"
    `, {
      officeType: offices.officeType,
      institutionId,
      officesId: officeMapped,
    });
    return queryFormatted;
  }
}