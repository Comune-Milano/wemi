import tabelle from 'tabelle';
import { Institution } from 'dto/institution/institution';

/**
 * The class to define the formatter for merchant on institutions
 */
export class MerchantInstitutionFormatter {
  /**
   * The constructor of the class
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(builder, formatter){
    this.builder = builder;
    this.formatter = formatter;
    const tableName = {
      table: tabelle.merchant,
    };
    this.tableName = tableName;
  }
  /**
   * format the insert for merchant
   * @param {Institution} institution the institution
   * @returns {string} the query for insert state
   */
  formatInsert(institution){
    const columns = [
      {
        name: 'id_ente',
        prop: 'id',
      },
      {
        name: 'id_merchant',
        prop: 'idMerchant',
      }, 
      {
        name: 'id_public_key',
        prop: 'publicKey',
      },
      {
        name: 'id_private_key',
        prop: 'privateKey',
      },
      {
        name: 'dt_inizio_val',
        prop: 'startDate',
      },
      {
        name: 'dt_fine_val',
        prop: 'endDate',
      },
      {
        name: 'ts_creazione',
        prop: 'tsState',
        mod: '^',
        def: 'localtimestamp',
      },
    ];
    const { ColumnSet: ClassColumnSet } = this.builder;
    const id = institution.getId();
    const columnSet = new ClassColumnSet(columns, this.tableName); 
    const queryInsert = this.builder.insert({
      id,
      idMerchant: institution.merchant?.id,
      publicKey: institution.merchant?.publicKey,
      privateKey: institution.merchant?.privateKey,
      startDate: institution.merchant?.startDate,
      endDate: institution.merchant?.endDate,
    }, columnSet);
    const query = this.formatter.format(`${queryInsert}
        RETURNING 
          id_ente as "institutionId"
      `);
    return query;
  }
  /**
   * format the update for merchant
   * @param {Institution} institution the institution
   * @returns {string} the query for insert state
   */
  formatUpdate(institution){
    const columns = [
      {
        name: 'id_merchant',
        prop: 'id',
      }, 
      {
        name: 'id_public_key',
        prop: 'publicKey',
      },
      {
        name: 'id_private_key',
        prop: 'privateKey',
      },
      {
        name: 'dt_inizio_val',
        prop: 'startDate',
      },
      {
        name: 'dt_fine_val',
        prop: 'endDate',
      },
    ];
    const { ColumnSet: ClassColumnSet } = this.builder;
    const columnSet = new ClassColumnSet(columns, this.tableName); 
    const queryUpdate = this.builder.update({
      id: institution.merchant.id,
      publicKey: institution.merchant.publicKey,
      privateKey: institution.merchant.privateKey,
      startDate: institution.merchant.startDate,
      endDate: institution.merchant.endDate,
    }, columnSet);
    const query = this.formatter.format(`${queryUpdate}
        WHERE id_ente = $[institutionId]
        RETURNING id_ente as "institutionId"
      `, {
        institutionId: institution.id,
      });
    return query;
  }
}