import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_tipo_offerta } = tabelle;
  return await knex.schema.createTable(d_tipo_offerta, function (t) {
    t.integer('cd_tipo_offerta_srv').primary().notNull();
    t.json('tl_valore_testuale');
    t.integer('pg_visualizzazione');
  });
      };

exports.down = function (knex) {
  const { d_tipo_offerta } = tabelle;
  return knex.schema.dropTable(d_tipo_offerta);
};
