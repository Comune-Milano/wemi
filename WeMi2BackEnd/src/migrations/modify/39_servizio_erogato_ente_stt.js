import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { servizio_erogato_ente_stt } = tabelle;
  return await knex.schema.alterTable(servizio_erogato_ente_stt, function (t) {
    t.foreign('id_servizio_ente').references('id_servizio_ente').inTable('servizio_erogato_ente');
  });
      };

exports.down = function (knex) {
  const { servizio_erogato_ente_stt } = tabelle;
  return knex.schema.dropTable(servizio_erogato_ente_stt);
};