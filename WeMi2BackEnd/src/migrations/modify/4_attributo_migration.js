import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { attributo } = tabelle;
  return await knex.schema.alterTable(attributo, function (t) {
    t.foreign('ty_dominio_tcb').references('ty_dominio_tcb').inTable('d_tipo_dominio_tcb');
  });
      };

exports.down = function (knex) {
  const { attributo } = tabelle;
  return knex.schema.dropTable(attributo);
};