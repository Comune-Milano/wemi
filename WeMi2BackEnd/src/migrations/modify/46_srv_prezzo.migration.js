import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { srv_prezzo } = tabelle;
  return await knex.schema.alterTable(srv_prezzo, function (t) {
    t.foreign('id_servizio_ente').references('id_servizio_ente').inTable('servizio_erogato_ente');
  });
      };

exports.down = function (knex) {
  const { srv_prezzo } = tabelle;
  return knex.schema.dropTable(srv_prezzo);
};