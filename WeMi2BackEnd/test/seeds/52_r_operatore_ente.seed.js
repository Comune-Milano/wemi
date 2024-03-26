import tabelle from 'tabelle';
import { fixtureROperatore} from '../fixtures/r_operatore_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_operatore_ente } = tabelle;
  await knex(r_operatore_ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureROperatore.map(operatore =>({
   id_utente:operatore.idUtente,
   id_ente:operatore.idEnte
    }));
  return await knex(r_operatore_ente).insert(fixtureMapped);

};