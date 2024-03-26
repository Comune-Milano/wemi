import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_sede_ente_servizio_erog } = tabelle;
  return await knex.schema.alterTable(r_sede_ente_servizio_erog, function (t) {
    t.foreign('id_sede_erogazione_srv').references('id_sede').inTable('sede_ente');
    t.foreign('id_servizio_ente').references('id_servizio_ente').inTable('servizio_erogato_ente');
  });
      };

exports.down = function (knex) {
  const { r_sede_ente_servizio_erog } = tabelle;
  return knex.schema.dropTable(r_sede_ente_servizio_erog);
};