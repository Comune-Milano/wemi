import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { sede_ente } = tabelle;
  return await knex.schema.createTable(sede_ente, function (t) {
    t.integer('id_sede').primary().notNull();
    t.integer('id_ente_rif').notNull();
    t.integer('ty_sede');
    t.json('js_sede');
    t.timestamp('ts_creazione').notNull();
  });
      };

exports.down = function (knex) {
  const { sede_ente } = tabelle;
  return knex.schema.dropTable(sede_ente);
};
