import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_sede_ente_servizio_erog } = tabelle;
  return await knex.schema.createTable(r_sede_ente_servizio_erog, function (t) {
    t.primary(['id_servizio_ente','id_sede_erogazione_srv']);
    t.integer('id_servizio_ente').notNull();
    t.integer('id_sede_erogazione_srv').notNull();
  });
      };

exports.down = function (knex) {
  const { r_sede_ente_servizio_erog } = tabelle;
  return knex.schema.dropTable(r_sede_ente_servizio_erog);
};
