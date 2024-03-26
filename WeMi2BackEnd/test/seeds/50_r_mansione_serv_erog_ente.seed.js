import tabelle from 'tabelle';
import { fixtureRMans} from '../fixtures/r_mansione_serv_erog_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_mansione_serv_erog_ente } = tabelle;
  await knex(r_mansione_serv_erog_ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureRMans.map(mans =>({
   id_servizio_ente:mans.idServizio,
   id_mansione:mans.idMans
    }));
  return await knex(r_mansione_serv_erog_ente).insert(fixtureMapped);

};