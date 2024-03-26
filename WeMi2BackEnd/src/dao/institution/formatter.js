import tabelle from 'tabelle';
import { Institution } from 'dto/institution/institution';

/**
 * The class to define the formatter for informations on institutions
 */
export class InformationInstitutionFormatter {
  /**
   * The constructor of the class
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(builder, formatter){
    this.builder = builder;
    this.formatter = formatter;
    const tableNames = {
      ente: { 
        table: tabelle.ente,
      },
      datiPropriEnte: { 
        table: tabelle.datiPropriEnte,
      },
      enteStt: { 
        table: tabelle.ente_stt,
      }, 
    };
    this.tableNames = tableNames;
  }
  /**
   * format the insert for state ente_stt
   * @param {Institution} institution the institution
   * @returns {string} the query for insert state
   */
  formatStateInsert(institution){
    const columns = [
      {
        name: 'id_ente',
        prop: 'id',
      },
      {
        name: 'id_utente',
        prop: 'userModified',
      },
      {
        name: 'cd_stato_ente',
        prop: 'code',
      },
      {
        name: 'ts_variazione_stato',
        prop: 'tsState',
        mod: '^',
        def: 'localtimestamp',
      },
    ];
    const { ColumnSet: ClassColumnSet } = this.builder;
   
    const columnSet = new ClassColumnSet(columns, this.tableNames.enteStt); 
    const queryInsert = this.builder.insert({
      ...institution,
      ...institution.state,
    }, columnSet);
    const query = this.formatter.format(`${queryInsert}
        RETURNING 
          id_ente as "institutionId"
      `);
    return query;
  }
  /**
   * format the update for corporate data dati_propri_ente
   * @param {Institution} institution the institution object
   * @returns {string} the string update formatted
   */
  formatCorporateDataUpdate(institution){
    const columns = [
      {
        name: 'tl_descrizione_ente',
        prop: 'description',
        mod: ':json',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'id_img_logo',
        prop: 'idLogo',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'tx_note_primo_contatto',
        prop: 'firstContactNote',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'js_referente',
        prop: 'contactPerson',
        mod: ':json',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'js_primo_contatto',
        prop: 'citizenAvailability',
        mod: ':json',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'js_altre_info',
        prop: 'othersInfo',
        mod: ':json',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'js_dati_bancari',
        prop: 'paymentInfo',
        mod: ':json',
        skip: col => !(col.exists) || (col.value === undefined),
      },
      {
        name: 'js_note_adminwemi',
        prop: 'note',
        mod: ':json',
        skip: col => !(col.exists) || (col.value === undefined),
      },
    ];

    const { ColumnSet: ClassColumnSet } = this.builder;
    const columnSet = new ClassColumnSet(columns, this.tableNames.datiPropriEnte); 
    const queryUpdate = this.builder.update(Object.create({ 
      description: institution.mapDescription(),
      othersInfo: institution.mapOthersInfo(),
      contactPerson: institution.mapContactPerson(),
      citizenAvailability: institution.mapCitizenAvailability(),
      paymentInfo: institution.mapPaymentInfo(),
      note: institution.note,
      idLogo: institution.logo?.id, 
      firstContactNote: institution.firstContactNote,
    }), columnSet);


    const query = this.formatter.format(
      `${queryUpdate}
        WHERE id_ente_rif = $[institutionId]
        RETURNING 
          id_ente_rif as "institutionId"
      `,
      {
        institutionId: institution.id,
      }
    );
    return query;
  }
}