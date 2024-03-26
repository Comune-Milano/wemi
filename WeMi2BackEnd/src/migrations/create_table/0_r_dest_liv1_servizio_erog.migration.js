import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_dest_liv1_servizio_erog } = tabelle;
  return await knex.schema.createTable(r_dest_liv1_servizio_erog, function (t) {
    t.primary(['id_destinatario_liv1','id_servizio_ente']);
    t.integer('id_destinatario_liv1').notNull();
    t.integer('id_servizio_ente').notNull();
  });
      };

exports.down = function (knex) {
  const { r_dest_liv1_servizio_erog } = tabelle;
  return knex.schema.dropTable(r_dest_liv1_servizio_erog);
};
