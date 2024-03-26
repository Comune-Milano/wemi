import tabelle from 'tabelle';
import { fixtureDominioTcb } from '../fixtures/dominio_tcb.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { dominio_tcb } = tabelle;
  await knex(dominio_tcb).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureDominioTcb.map(dominio =>({
   ty_dominio_tcb:dominio.tyDominio,
   cd_dominio_tcb:dominio.cdDominio,
   pg_visualizzazione:dominio.pgVis,
   cd_naturale_dominio:dominio.cdNaturale,
   tl_valore_testuale:dominio.tlValore,
   nr_valore_min_rif:dominio.nrValoreMin,
   nr_valore_max_rif:dominio.nrValoreMax
    }));
  return await knex(dominio_tcb).insert(fixtureMapped);

};