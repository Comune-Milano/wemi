import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_dest_liv2_servizio_erog } = tabelle;
  return await knex.schema.alterTable(r_dest_liv2_servizio_erog, function (t) {
    t.foreign('id_destinatario_liv2').references('id_contenuto').inTable('contenuto');
    t.foreign('id_servizio_ente').references('id_servizio_ente').inTable('servizio_erogato_ente');
  });
      };

exports.down = function (knex) {
  const { r_dest_liv2_servizio_erog } = tabelle;
  return knex.schema.dropTable(r_dest_liv2_servizio_erog);
};