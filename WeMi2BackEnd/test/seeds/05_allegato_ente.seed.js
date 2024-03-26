import tabelle from 'tabelle';
import { fixtureAllegatoEnte } from '../fixtures/allegato_ente.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { allegato_ente } = tabelle;
  await knex(allegato_ente).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureAllegatoEnte.map(ente =>({
      id_ente: ente.idEnte,
      id_media: ente.idMedia,
      ty_allegato: ente.tyAllegato
    }));
  return await knex(allegato_ente).insert(fixtureMapped);

};