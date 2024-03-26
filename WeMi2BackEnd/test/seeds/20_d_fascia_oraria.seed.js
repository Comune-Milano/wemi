import tabelle from 'tabelle';
import { fixtureFascia } from '../fixtures/d_fascia_oraria.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { d_fascia_oraria } = tabelle;
  await knex(d_fascia_oraria).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureFascia.map(fascia =>({
    cd_fascia_oraria:fascia.cdFascia,
    tl_valore_testuale:fascia.tlTesto,
    pg_visualizzazione:fascia.pgVis
    }));
  return await knex(d_fascia_oraria).insert(fixtureMapped);

};