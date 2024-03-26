import 'dotenv/config';
import { dbManagerKnex } from './utils/knex';

module.exports = async () => {
  const dbManager = dbManagerKnex();
  const knexObj = dbManager.knexInstance();
  await knexObj.raw('DROP SCHEMA wemi2 CASCADE;');
  await knexObj.destroy();
  await dbManager.closeKnex();
  await dbManager.dropDb('wemi_test');
  await dbManager.close();
};




