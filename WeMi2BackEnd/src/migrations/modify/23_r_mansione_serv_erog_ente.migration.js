import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_mansione_serv_erog_ente } = tabelle;
  return await knex.schema.alterTable(r_mansione_serv_erog_ente, function (t) {
    t.foreign('id_mansione').references('id_contenuto').inTable('contenuto');
    t.foreign('id_servizio_ente').references('id_servizio_ente').inTable('servizio_erogato_ente');
  });
      };

exports.down = function (knex) {
  const { r_mansione_serv_erog_ente } = tabelle;
  return knex.schema.dropTable(r_mansione_serv_erog_ente);
};