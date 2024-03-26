import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_municipio_servito_serv_ente } = tabelle;
  return await knex.schema.createTable(r_municipio_servito_serv_ente, function (t) {
    t.primary(['id_servizio_ente','cd_municipio_servito']);
    t.integer('id_servizio_ente').notNull();
    t.integer('cd_municipio_servito').notNull();
  });
      };

exports.down = function (knex) {
  const { r_municipio_servito_serv_ente } = tabelle;
  return knex.schema.dropTable(r_municipio_servito_serv_ente);
};
