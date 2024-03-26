import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_operatore_ente } = tabelle;
  return await knex.schema.alterTable(r_operatore_ente, function (t) {
    t.foreign('id_ente').references('id_ente').inTable('ente');
    t.foreign('id_utente').references('id_utente').inTable('utente');
  });
      };

exports.down = function (knex) {
  const { r_operatore_ente } = tabelle;
  return knex.schema.dropTable(r_operatore_ente);
};