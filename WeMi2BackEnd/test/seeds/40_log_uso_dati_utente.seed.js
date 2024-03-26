import tabelle from 'tabelle';
import { fixtureLog } from '../fixtures/log_uso_dati_utente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { log_uso_dati_utente } = tabelle;
  await knex(log_uso_dati_utente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureLog.map(log =>({
   ts_creazione_attivita:log.tsCreazione,
   id_utente_proprietario_dati:log.idUtente,
   id_utente_esecutore_attivita:log.idUtenteEsecutore,
   cd_attivita:log.cdAttivita,
   js_dati_attivita:log.jsAttivita
    }));
  return await knex(log_uso_dati_utente).insert(fixtureMapped);

};