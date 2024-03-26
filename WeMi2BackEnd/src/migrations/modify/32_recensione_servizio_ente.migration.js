import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { recensione_ente } = tabelle;
  return await knex.schema.alterTable(recensione_ente, function (t) {
    t.foreign('id_rich_serv_rec').references('id_richiesta_servizio_ente').inTable('richiesta_servizio_ente');
  });
      };

exports.down = function (knex) {
  const { recensione_ente } = tabelle;
  return knex.schema.dropTable(recensione_ente);
};