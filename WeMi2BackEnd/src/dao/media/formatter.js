import tabelle from 'tabelle';

/**
 * The class to define the formatter for media 
 */
export class MediaFormatter {
  /**
   * The constructor of the class
   * @param {object} builder the query builder object
   * @param {object} formatter the formatter object
   */
  constructor(builder, formatter){
    this.builder = builder;
    this.formatter = formatter;
    this.tableName = {
      table: tabelle.media,
    };
  }
  /**
   * format the insert for media
   * @param {object} media a media
   * @returns {string} the query for insert media
   */
  formatInsert(media){
    const columns = [
      {
        name: 'id_media',
        prop: 'idMedia',
        mod: '^',
        def: 'nextval(\'seq_media\')',
      },
      {
        name: 'ty_mime_type_media',
        prop: 'mime',
      },
      {
        name: 'nm_nome_media',
        prop: 'name',
      },
      {
        name: 'oj_media',
        prop: 'blob',
      },
      {
        name: 'ty_visib_media',
        prop: 'visibility',
        skip: col => !col.exists,
      },
      {
        name: 'ts_creazione',
        prop: 'tsCreazione',
        mod: '^',
        def: 'localtimestamp',
      },
      {
        name: 'iw_path',
        mod: '^',
        def: this.formatter.format(
          'CONCAT(\'media/\', currval(\'wemi2.seq_media\'), \'_\', $[storagePath])', {
            storagePath: media?.name,  
          }),
      },
    ];
 
    const { ColumnSet: ClassColumnSet } = this.builder;

    const columnSet = new ClassColumnSet(columns, this.tableName); 

    const queryInsert = this.builder.insert({
      ...media,
      visibility: media?.visibility,
      storagePath: media?.storagePath,
    }, columnSet);
    const query = this.formatter.format(`${queryInsert}
        RETURNING 
          id_media as "id"
      `);
    return query;
  }
}