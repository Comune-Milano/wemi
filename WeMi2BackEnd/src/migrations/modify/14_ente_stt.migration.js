import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { ente_stt } = tabelle;
  return await knex.schema.alterTable(ente_stt, function (t) {
    t.foreign('id_ente').references('id_ente').inTable('ente');
    t.foreign('id_utente').references('id_utente').inTable('utente');
  });
      };

exports.down = function (knex) {
  const { ente_stt } = tabelle;
  return knex.schema.dropTable(ente_stt);
};