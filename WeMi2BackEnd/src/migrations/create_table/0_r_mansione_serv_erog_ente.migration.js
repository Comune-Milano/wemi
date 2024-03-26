import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_mansione_serv_erog_ente } = tabelle;
  return await knex.schema.createTable(r_mansione_serv_erog_ente, function (t) {
    t.primary(['id_servizio_ente','id_mansione']);
    t.integer('id_servizio_ente').notNull();
    t.integer('id_mansione').notNull();
  });
      };

exports.down = function (knex) {
  const { r_mansione_serv_erog_ente } = tabelle;
  return knex.schema.dropTable(r_mansione_serv_erog_ente);
};
