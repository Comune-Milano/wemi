import tabelle from 'tabelle';
import { fixtureMedia } from '../fixtures/media.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { media } = tabelle;
  await knex(media).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureMedia.map(media =>({
   id_media:knex.raw("nextval('wemi2.seq_media')"),
   ty_mime_type_media:media.tyMime,
   nm_nome_media:media.nmNome,
   oj_media:media.oj_media,
   ty_visib_media:media.tyVisib,
   ts_creazione:media.tsCreazione
    }));
  return await knex(media).insert(fixtureMapped);

};