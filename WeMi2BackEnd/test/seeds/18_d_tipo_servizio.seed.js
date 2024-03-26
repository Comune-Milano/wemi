import tabelle from 'tabelle';
import { fixtureTipoServizio } from '../fixtures/d_tipo_servizio.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { d_tipo_servizio } = tabelle;
  await knex(d_tipo_servizio).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureTipoServizio.map(servizio =>({
    cd_tipo_servizio:servizio.cdServizio,
    tl_valore_testuale:servizio.tlTesto,
    pg_visualizzazione:servizio.pgVis
    }));
  return await knex(d_tipo_servizio).insert(fixtureMapped);

};