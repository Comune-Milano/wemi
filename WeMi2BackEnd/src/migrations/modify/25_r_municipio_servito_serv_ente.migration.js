import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_municipio_servito_serv_ente } = tabelle;
  return await knex.schema.alterTable(r_municipio_servito_serv_ente, function (t) {
    t.foreign('id_servizio_ente').references('id_servizio_ente').inTable('servizio_erogato_ente');
    t.foreign('cd_municipio_servito').references('cd_municipio').inTable('d_municipio');
  });
      };

exports.down = function (knex) {
  const { r_municipio_servito_serv_ente } = tabelle;
  return knex.schema.dropTable(r_municipio_servito_serv_ente);
};