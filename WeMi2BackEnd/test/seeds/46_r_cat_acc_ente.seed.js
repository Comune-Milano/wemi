import tabelle from 'tabelle';
import { fixtureCatAcc } from '../fixtures/r_cat_acc_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_cat_acc_ente } = tabelle;
  await knex(r_cat_acc_ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureCatAcc.map(acc =>({
   id_ente:acc.idEnte,
   id_cat_accreditamento:acc.idCategoria
    }));
  return await knex(r_cat_acc_ente).insert(fixtureMapped);

};