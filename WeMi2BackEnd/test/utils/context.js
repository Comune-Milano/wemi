import tabelle from "tabelle";
import sequence from "sequence";
import pgPromise from 'pg-promise';
import { mockUtente } from 'mocks/utenteConnesso';

 /**
  * Mock pg-promise
  */
 const pgp = pgPromise({
  schema: 'wemi2'
});

const db = pgp({
  host: 'localhost',
  port: '5432',
  database: 'wemi_test',
  user: 'postgres',
  password: 'admin',
});


/**
  * Mock logger
  */
 const logger = {
  info: () =>{},
  error: ()=>{},
  trace: () =>{},
}

export const contextCreationMock = {
   user: mockUtente,
   db,
   logger,
   queryBuilder: pgp.helpers,
   formatter: pgp.as,
   tabelle,
   sequence
 };