import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_municipio } = tabelle;
  return await knex.schema.createTable(d_municipio, function (t) {
    t.integer('cd_municipio').primary().notNull();
    t.json('tl_valore_testuale').notNull();
    t.integer('pg_visualizzazione').notNull();
  });
      };

exports.down = function (knex) {
  const { d_municipio } = tabelle;
  return knex.schema.dropTable(d_municipio);
};
