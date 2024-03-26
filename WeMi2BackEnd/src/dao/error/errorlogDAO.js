import { insertError } from 'sql/errorlog/insert';

export class ErrorLogDAO {
  constructor(db, logger) {
    this.db = db;
    this.logger = logger;
  }

  /**
   * Inserts the error.
   */
  insert(description, userId) {
    this.logger.info({ description, userId }, 'Keeping track in error log table');

    return this.db.none(insertError, {
      description: description || 'Unkown description',
      userId
    });
  }
}