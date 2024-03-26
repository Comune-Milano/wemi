import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_tipo_servizio } = tabelle;
  return await knex.schema.createTable(d_tipo_servizio, function (t) {
    t.integer('cd_tipo_servizio').primary().notNull();
    t.json('tl_valore_testuale');
    t.integer('pg_visualizzazione');
  });
      };

exports.down = function (knex) {
  const { d_tipo_servizio } = tabelle;
  return knex.schema.dropTable(d_tipo_servizio);
};
