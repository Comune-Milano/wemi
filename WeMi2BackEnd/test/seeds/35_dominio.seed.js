import tabelle from 'tabelle';
import { fixtureDominio } from '../fixtures/dominio.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { dominio } = tabelle;
  await knex(dominio).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureDominio.map(dominio =>({
   ty_dominio:dominio.tyDominio,
   cd_dominio:dominio.cdDominio,
   tl_valore_testuale:dominio.tlValore,
   pg_visualizzazione:dominio.pgVis
    }));
  return await knex(dominio).insert(fixtureMapped);

};