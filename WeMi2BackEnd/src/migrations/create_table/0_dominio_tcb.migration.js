import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { dominio_tcb } = tabelle;
  return await knex.schema.createTable(dominio_tcb, function (t) {
    t.primary(['ty_dominio_tcb','cd_dominio_tcb']);
    t.integer('ty_dominio_tcb',3).notNull();
    t.integer('cd_dominio_tcb',3).notNull();
    t.integer('pg_visualizzazione');
    t.string('cd_naturale_dominio');
    t.json('tl_valore_testuale');
    t.integer('nr_valore_min_rif');
    t.integer('nr_valore_max_rif');
  });
      };

exports.down = function (knex) {
  const { dominio_tcb } = tabelle;
  return knex.schema.dropTable(dominio_tcb);
};
