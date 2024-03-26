import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_categoria_contrattuale_tcb } = tabelle;
  return await knex.schema.createTable(d_categoria_contrattuale_tcb, function (t) {
    t.primary(['cd_categoria_contrattuale','id_servizio_riferimento']);
    t.string('cd_categoria_contrattuale',2).notNull();
    t.integer('id_servizio_riferimento').notNull();
    t.json('tl_valore_testuale');
    t.integer('pg_visualizzazione');
  });
      };

exports.down = function (knex) {
  const { d_categoria_contrattuale_tcb } = tabelle;
  return knex.schema.dropTable(d_categoria_contrattuale_tcb);
};
