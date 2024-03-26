import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { merchant } = tabelle;
  return await knex.schema.alterTable(merchant, function (t) {
    t.foreign('id_ente').references('id_ente').inTable('ente');
  });
      };

exports.down = function (knex) {
  const { merchant } = tabelle;
  return knex.schema.dropTable(merchant);
};