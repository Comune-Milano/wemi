import tabelle from 'tabelle';
import { fixtureOfferta } from '../fixtures/d_tipo_offerta.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { d_tipo_offerta } = tabelle;
  await knex(d_tipo_offerta).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureOfferta.map(offerta =>({
    cd_tipo_offerta_srv:offerta.cdOfferta,
    tl_valore_testuale:offerta.tlTesto,
    pg_visualizzazione:offerta.pgVis
    }));
  return await knex(d_tipo_offerta).insert(fixtureMapped);

};