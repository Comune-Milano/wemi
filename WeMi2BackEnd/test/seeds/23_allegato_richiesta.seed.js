import tabelle from 'tabelle';
import { fixtureAllegatoRichiesta } from '../fixtures/allegato_richiesta.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { allegato_richiesta } = tabelle;
  await knex(allegato_richiesta).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureAllegatoRichiesta.map(allegato =>({
      id_allegato: allegato.idAllegato,
      id_richiesta: allegato.idRichiesta,
      id_lavoratore: allegato.idLavoratore,
      nm_nome_allegato_ric:allegato.nmNomeAllegatoRic,
      oj_allegato_ric:allegato.ojAllegatoRic,
      ts_creazione: allegato.tsCreazione
    }));
  return await knex(allegato_richiesta).insert(fixtureMapped);

};