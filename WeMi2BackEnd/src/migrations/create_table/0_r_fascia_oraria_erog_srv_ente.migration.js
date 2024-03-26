import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_fascia_oraria_erog_srv_ente } = tabelle;
  return await knex.schema.createTable(r_fascia_oraria_erog_srv_ente, function (t) {
    t.primary(['id_servizio_ente','cd_fascia_oraria_erog_srv_ente']);
    t.integer('id_servizio_ente').notNull();
    t.integer('cd_fascia_oraria_erog_srv_ente').notNull();
  });
      };

exports.down = function (knex) {
  const { r_fascia_oraria_erog_srv_ente } = tabelle;
  return knex.schema.dropTable(r_fascia_oraria_erog_srv_ente);
};
