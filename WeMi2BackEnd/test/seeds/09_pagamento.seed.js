import tabelle from 'tabelle';
import { fixturePagamento } from '../fixtures/pagamento.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { pagamento } = tabelle;
  await knex(pagamento).delete();
  // Inserts seed entries
  const fixtureMapped = fixturePagamento.map(pagamento =>({
   id_interno_transazione:knex.raw("nextval('wemi2.seq_pagamento')"),
   js_dati_fatturazione:pagamento.jsFatturazione,
   js_dati_pagamento:pagamento.jsPagamento,
   ts_creazione:pagamento.tsCreazione
    }));
  return await knex(pagamento).insert(fixtureMapped);

};