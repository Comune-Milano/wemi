import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { allegato_ente } = tabelle;
  return await knex.schema.createTable(allegato_ente, function (t) {
    t.integer('id_ente').primary().notNull();
      t.integer('id_media').notNull();
      t.string('ty_allegato').notNull();
  });
      };

exports.down = function (knex) {
  const { allegato_ente } = tabelle;
  return knex.schema.dropTable(allegato_ente);
};