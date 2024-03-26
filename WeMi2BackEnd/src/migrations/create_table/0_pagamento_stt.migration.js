import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { pagamento_stt } = tabelle;
  return await knex.schema.createTable(pagamento_stt, function (t) {
    t.primary(['id_interno_trans_pag','ts_variazione_stato']);
    t.integer('id_interno_trans_pag').notNull();
    t.timestamp('ts_variazione_stato').notNull();
    t.string('cd_stato_pagamento',20).notNull();
    t.integer('id_utente');
  });
      };

exports.down = function (knex) {
  const { pagamento_stt } = tabelle;
  return knex.schema.dropTable(pagamento_stt);
};
