import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { recensione_ente_stt } = tabelle;
  return await knex.schema.alterTable(recensione_ente_stt, function (t) {
    t.foreign('id_rich_serv_rec').references('id_rich_serv_rec').inTable('recensione_servizio_ente');
  });
      };

exports.down = function (knex) {
  const { recensione_ente_stt } = tabelle;
  return knex.schema.dropTable(recensione_ente_stt);
};