import { insertUpdateQualifiche } from '../../sql/qualifichePersonale/insertUpdateQualifiche';
import { deleteQualifiche } from '../../sql/qualifichePersonale/deleteQualifiche';

/**
 * The class to interact with the r_qual_pers_serv_erog_ente tables
 */
class RQualPersServErogEnteDao {
  /**
   * The constructor of the class
   * @param {object} db indicates the connection object
   */
  constructor(db, queryBuilder) {
    this.connection = db;
    this.helpers = queryBuilder;
  }

  async deleteQualifications(idServizioEnte, personaleRif) {
    this.connection.none(deleteQualifiche, { idServizioEnte, personaleRif });
  }

  async insertUpdateQualifications(idServizioEnte, idQualifiche, personaleRif) {
    //prima vengono eliminate tutte le qualifiche e vengono inserite se presenti

    // delete
    this.deleteQualifications(idServizioEnte, personaleRif);
    if (idQualifiche?.length) {
      // insert/update
      const query = insertUpdateQualifiche(idQualifiche, this.helpers);
      this.connection.none(query, { idServizioEnte, personaleRif });
    }
  }
}

export default RQualPersServErogEnteDao;