import knex from 'knex';
import knexManager from 'knex-db-manager';
import config from './knexconfig';
import { __TEST__ } from 'environment';

export const dbKnex = function(){
  
  if(__TEST__){
    return knex(config.test);
  }

};

export const dbManagerKnex = () => {

  if(__TEST__){
    return knexManager.databaseManagerFactory(config.test);
  }

};