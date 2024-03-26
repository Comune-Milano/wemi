import tabelle from 'tabelle';
import { fixtureConversazione } from '../fixtures/conversazione_utente_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { conversazione_utente_ente } = tabelle;
  await knex(conversazione_utente_ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureConversazione.map(conversazione =>({
     id_conversazione_ut_ente:knex.raw("nextval('wemi2.seq_conversazione_utente_ente')"),
     id_richiesta_servizio_ente:conversazione.idRichiesta,
     tx_testo_messaggio:conversazione.testo,
     id_utente_autore_msg:conversazione.idUtenteAutore,
     fg_msg_ente:conversazione.fgMsg,
     ts_creazione:conversazione.tsCreazione
    }));
  return await knex(conversazione_utente_ente).insert(fixtureMapped);

};