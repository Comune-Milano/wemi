import tabelle from 'tabelle';
import { fixtureCategoria } from '../fixtures/d_categoria_contrattuale_tcb.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { d_categoria_contrattuale_tcb } = tabelle;
  await knex(d_categoria_contrattuale_tcb).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureCategoria.map(categoria =>({
    cd_categoria_contrattuale:categoria.cdCategoria,
    id_servizio_riferimento:categoria.idServizio,
    tl_valore_testuale:categoria.tlTesto,
    pg_visualizzazione:categoria.pgVis
    }));
  return await knex(d_categoria_contrattuale_tcb).insert(fixtureMapped);

};