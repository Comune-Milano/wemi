import 'dotenv/config';
import { dbManagerKnex } from './utils/knex';

module.exports = async () => {
  const dbManager = dbManagerKnex();
  await dbManager.dropDb('wemi_test');
  await dbManager.createDb('wemi_test');
  const knexObj = dbManager.knexInstance();
  await knexObj.schema.createSchemaIfNotExists('wemi2');
  await knexObj.migrate.latest();
  await knexObj.seed.run();
  await knexObj.destroy();
  await dbManager.closeKnex();
  await dbManager.close();
};




