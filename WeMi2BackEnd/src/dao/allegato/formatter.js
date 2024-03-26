import tabelle from 'tabelle';

/**
 * The class to define the formatter for attachments on institutions
 */
export class AttachmentInstitutionFormatter {
  /**
   * The constructor of the class
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(builder, formatter){
    this.builder = builder;
    this.formatter = formatter;
    this.tableName = {
      table: tabelle.allegato_ente,
    };
  }
  /**
   * format the insert for attachments
   * @param {object} attachment the attachment
   * @param {number} institutionId the id of the institution
   * @returns {string} the query for insert attachments
   */
  formatInsert(attachment, institutionId){
    const columns = [
      {
        name: 'id_ente',
        prop: 'institutionId',
      },
      {
        name: 'id_media',
        prop: 'id',
      },
      {
        name: 'ty_allegato',
        prop: 'type',
      },
    ];
    const { ColumnSet: ClassColumnSet } = this.builder;
    const columnSet = new ClassColumnSet(columns, this.tableName); 
    const queryInsert = this.builder.insert({ ...attachment, institutionId }, columnSet);
    const query = this.formatter.format(`${queryInsert}
        RETURNING 
          id_media as "id", id_ente as "institutionId"
      `);
    return query;
  }
}