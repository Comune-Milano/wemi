import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_tipo_dominio_tcb } = tabelle;
  return await knex.schema.createTable(d_tipo_dominio_tcb, function (t) {
    t.integer('ty_dominio_tcb',3).primary().notNull();
    t.string('tx_descrizione');
  });
      };

exports.down = function (knex) {
  const { d_tipo_dominio_tcb } = tabelle;
  return knex.schema.dropTable(d_tipo_dominio_tcb);
};
