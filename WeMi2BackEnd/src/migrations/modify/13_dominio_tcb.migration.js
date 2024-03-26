import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { dominio_tcb } = tabelle;
  return await knex.schema.alterTable(dominio_tcb, function (t) {
    t.foreign('ty_dominio_tcb').references('ty_dominio_tcb').inTable('d_tipo_dominio_tcb');
  });
      };

exports.down = function (knex) {
  const { dominio_tcb } = tabelle;
  return knex.schema.dropTable(dominio_tcb);
};