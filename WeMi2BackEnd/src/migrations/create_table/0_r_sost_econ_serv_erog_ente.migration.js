import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_sost_econ_serv_erog_ente } = tabelle;
  return await knex.schema.createTable(r_sost_econ_serv_erog_ente, function (t) {
    t.primary(['id_contenuto_sostegno_econ','id_servizio_ente']);
    t.integer('id_contenuto_sostegno_econ').notNull();
    t.integer('id_servizio_ente').notNull();
  });
      };

exports.down = function (knex) {
  const { r_sost_econ_serv_erog_ente } = tabelle;
  return knex.schema.dropTable(r_sost_econ_serv_erog_ente);
};
