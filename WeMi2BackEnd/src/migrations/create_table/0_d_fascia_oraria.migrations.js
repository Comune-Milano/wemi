import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_fascia_oraria } = tabelle;
  return await knex.schema.createTable(d_fascia_oraria, function (t) {
    t.integer('cd_fascia_oraria').primary().notNull();
    t.json('tl_valore_testuale');
    t.integer('pg_visualizzazione');
  });
      };

exports.down = function (knex) {
  const { d_fascia_oraria } = tabelle;
  return knex.schema.dropTable(d_fascia_oraria);
};
