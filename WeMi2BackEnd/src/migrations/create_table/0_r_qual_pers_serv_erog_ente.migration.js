import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_qual_pers_serv_erog_ente } = tabelle;
  return await knex.schema.createTable(r_qual_pers_serv_erog_ente, function (t) {
    t.primary(['id_servizio_ente','id_qualifica']);
    t.integer('id_servizio_ente').notNull();
    t.integer('id_qualifica').notNull();
    t.integer('ty_personale_rif')
  });
      };

exports.down = function (knex) {
  const { r_qual_pers_serv_erog_ente } = tabelle;
  return knex.schema.dropTable(r_qual_pers_serv_erog_ente);
};
