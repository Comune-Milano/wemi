import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_modalita_erogazione } = tabelle;
  return await knex.schema.createTable(d_modalita_erogazione, function (t) {
    t.integer('cd_modalita_erogazione').primary().notNull();
    t.json('tl_valore_testuale');
    t.integer('pg_visualizzazione');
  });
      };

exports.down = function (knex) {
  const { d_modalita_erogazione } = tabelle;
  return knex.schema.dropTable(d_modalita_erogazione);
};
