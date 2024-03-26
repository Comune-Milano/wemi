import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { ente } = tabelle;
  return await knex.schema.alterTable(ente, function (t) {
    t.foreign('id_utente_admin').references('id_utente').inTable('utente');
  });
      };

exports.down = function (knex) {
  const { ente } = tabelle;
  return knex.schema.dropTable(ente);
};