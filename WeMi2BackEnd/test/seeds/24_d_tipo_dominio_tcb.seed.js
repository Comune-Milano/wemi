import tabelle from 'tabelle';
import { fixtureTipoDominio } from '../fixtures/d_tipo_dominio_tcb.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { d_tipo_dominio_tcb } = tabelle;
  await knex(d_tipo_dominio_tcb).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureTipoDominio.map(tipo =>({
    ty_dominio_tcb:tipo.tyDominio,
    tx_descrizione:tipo.testo
    }));
  return await knex(d_tipo_dominio_tcb).insert(fixtureMapped);

};