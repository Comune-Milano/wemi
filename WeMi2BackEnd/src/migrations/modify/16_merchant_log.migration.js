import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { merchant_log } = tabelle;
  return await knex.schema.alterTable(merchant_log, function (t) {
    t.foreign('id_ente').references('id_ente').inTable('ente');
    t.foreign('id_utente').references('id_utente').inTable('utente');
  });
      };

exports.down = function (knex) {
  const { merchant_log } = tabelle;
  return knex.schema.dropTable(merchant_log);
};