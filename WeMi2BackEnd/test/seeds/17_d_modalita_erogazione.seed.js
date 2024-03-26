import tabelle from 'tabelle';
import { fixtureModalita } from '../fixtures/d_modalita_erogazione.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { d_modalita_erogazione } = tabelle;
  await knex(d_modalita_erogazione).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureModalita.map(modalita =>({
    cd_modalita_erogazione:modalita.cdModalita,
    tl_valore_testuale:modalita.tlTesto,
    pg_visualizzazione:modalita.pgVis
    }));
  return await knex(d_modalita_erogazione).insert(fixtureMapped);

};