import tabelle from 'tabelle';
import { fixtureUtenteOffertaLavStt } from '../fixtures/utente_offerta_lav_stt.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { utente_offerta_lav_stt } = tabelle;
  await knex(utente_offerta_lav_stt).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureUtenteOffertaLavStt.map(offerta =>({
   id_utente_lav:offerta.idUtenteLav,
   ts_variazione_stato:offerta.tsVariazione,
   cd_stato_dati_lav:offerta.cdStato,
   id_utente:offerta.idUtente
    }));
  return await knex(utente_offerta_lav_stt).insert(fixtureMapped);

};