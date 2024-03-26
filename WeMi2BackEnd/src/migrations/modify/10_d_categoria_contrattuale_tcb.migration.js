import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_categoria_contrattuale_tcb } = tabelle;
  return await knex.schema.alterTable(d_categoria_contrattuale_tcb, function (t) {
    t.foreign('id_servizio_riferimento').references('id_servizio').inTable('servizio');
  });
      };

exports.down = function (knex) {
  const { d_categoria_contrattuale_tcb } = tabelle;
  return knex.schema.dropTable(d_categoria_contrattuale_tcb);
};