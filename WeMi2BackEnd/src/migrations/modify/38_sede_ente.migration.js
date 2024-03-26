import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { sede_ente } = tabelle;
  return await knex.schema.alterTable(sede_ente, function (t) {
    t.foreign('id_ente_rif').references('id_ente_rif').inTable('dati_propri_ente');
  });
      };

exports.down = function (knex) {
  const { sede_ente } = tabelle;
  return knex.schema.dropTable(sede_ente);
};