import tabelle from 'tabelle';
import { fixtureEnteStt } from '../fixtures/ente_stt.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { ente_stt } = tabelle;
  await knex(ente_stt).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureEnteStt.map(ente =>({
   id_ente:ente.idEnte,
   ts_variazione_stato:ente.tsVariazione,
   cd_stato_ente:ente.cdStato,
   id_utente:ente.idUtente
    }));
  return await knex(ente_stt).insert(fixtureMapped);

};