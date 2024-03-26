import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { dominio } = tabelle;
  return await knex.schema.createTable(dominio, function (t) {
    t.primary(['ty_dominio','cd_dominio']);
    t.string('ty_dominio',20).notNull();
    t.string('cd_dominio',20).notNull();
    t.json('tl_valore_testuale');
    t.integer('pg_visualizzazione');
  });
      };

exports.down = function (knex) {
  const { dominio } = tabelle;
  return knex.schema.dropTable(dominio);
};
