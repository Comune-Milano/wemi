import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { parametro_generale } = tabelle;
  return await knex.schema.createTable(parametro_generale, function (t) {
    t.string('nome_parametro').notNull();
    t.string('valore_tx_parametro').notNull();
    t.date('valore_dt_parametro');
  });
      };

exports.down = function (knex) {
  const { parametro_generale } = tabelle;
  return knex.schema.dropTable(parametro_generale);
};
