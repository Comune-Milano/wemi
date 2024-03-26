// http://vitaly-t.github.io/pg-promise/Database.html
// https://stackoverflow.com/questions/34382796/where-should-i-initialize-pg-promise

// Fix: Aggiunto pg-monitor per Log di  tutti  i possibili errori compresi quelli di connessione iniziale
// e monitoring dello stato delle connessioni
// https://www.npmjs.com/package/pg-monitor
import monitor from 'pg-monitor';

import pgPromise from 'pg-promise';
import moment from 'moment';
import { types } from 'pg';
import { logger } from "utility/logger/getInstance";

// Initialization Options
const initOptions = {
  schema: process.env.WEMI2_DB_SCHEMA,
};

const pgp = pgPromise(initOptions);
pgp.pg.defaults.parseInputDatesAsUTC = true;
// 1114 is OID for timestamp in Postgres
pgp.pg.types.setTypeParser(types.builtins.TIMESTAMP, str => {
  const utcTimestamp = moment.utc(str);
  if (!utcTimestamp.isValid()) {
    logger.error('Error - trying to parse an invalid-date', str);
    return str;
  }

  return utcTimestamp.toDate();
});

// Creating a new database instance from the connection details
//https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax
// Fix: rendere variabile il dato di dimensione del connection pool

const dbcn = {
  host: process.env.WEMI2_DB_HOST,
  port: process.env.WEMI2_DB_PORT,
  database: process.env.WEMI2_DB_NAME,
  user: process.env.WEMI2_DB_USER,
  password: process.env.WEMI2_DB_PWD,
  max: process.env.WEMI2_DB_MAX_CONNECTIONPOOL_SIZE,
};

const db = pgp(dbcn);

// in produzione si abilita solo il monitor degli errori
var events = ['connect', 'disconnect', 'query', 'task', 'transact', 'error'];
if (process.env.WEMI2_MON_ONLY_ERROR.toUpperCase() == "Y") {
  events = ['error'];
}

monitor.attach(initOptions, events);
monitor.setDetailed(true);

//inserito per verificare immediatamente se il DB è connessso omeno
//e per tracciare la versione del DB connesso
db.proc('version')
  .then(data => {
    // SUCCESS
    // data.version =
    // 'PostgreSQL 9.5.1, compiled by Visual C++ build 1800, 64-bit'
    logger.info("WeMi DB SUCCESSFULL connection, DB version: ", data.version);
  })
  .catch(error => {
    if (Array.isArray(error) && 'getErrors' in error) {
      error = error.getErrors()[0];
    }
    logger.error(error, "Error: WeMi DB connection failed");
  });

export default {
  db,
  queryBuilder: pgp.helpers,
  formatter: pgp.as
};
