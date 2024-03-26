import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { pagamento } = tabelle;
  return await knex.schema.createTable(pagamento, function (t) {
    t.integer('id_interno_transazione').primary().notNull();
    t.json('js_dati_fatturazione');
    t.json('js_dati_pagamento');
    t.timestamp('ts_creazione').notNull();
  });
      };

exports.down = function (knex) {
  const { pagamento } = tabelle;
  return knex.schema.dropTable(pagamento);
};
