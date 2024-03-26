import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { servizio } = tabelle;
  return await knex.schema.createTable(servizio, function (t) {
    t.integer('id_servizio').primary().notNull();
    t.integer('id_categoria_accreditamento').notNull();
    t.string('tx_tags_ricerca',1000).notNull();
    t.integer('cd_unita_prezzo').notNull();
  });
      };

exports.down = function (knex) {
  const { servizio } = tabelle;
  return knex.schema.dropTable(servizio);
};
