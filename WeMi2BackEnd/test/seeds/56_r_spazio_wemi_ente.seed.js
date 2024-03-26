import tabelle from 'tabelle';
import { fixtureRSpazio} from '../fixtures/r_spazio_wemi_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_spazio_wemi_ente } = tabelle;
  await knex(r_spazio_wemi_ente).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureRSpazio.map(spazio =>({
   id_ente:spazio.idEnte,
   id_spazio_wemi:spazio.idSpazio
    }));
  return await knex(r_spazio_wemi_ente).insert(fixtureMapped);

};