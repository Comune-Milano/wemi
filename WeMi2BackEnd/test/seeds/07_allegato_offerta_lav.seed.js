import tabelle from 'tabelle';
import { fixtureAllegatoLav } from '../fixtures/allegato_offerta_lav.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { allegato_offerta_lav } = tabelle;
  await knex(allegato_offerta_lav).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureAllegatoLav.map(allegato =>({
      id_allegato: knex.raw("nextval('wemi2.seq_allegato_offerta_lav')"),
      id_utente_lav: allegato.idUtenteLav,
      nm_nome_allegato_off: allegato.nmNomeAlleagatoOff,
      oj_allegato_off: allegato.ojAllegatoOff,
      ts_creazione: allegato.tsCreazione
    }));
  return await knex(allegato_offerta_lav).insert(fixtureMapped);

};