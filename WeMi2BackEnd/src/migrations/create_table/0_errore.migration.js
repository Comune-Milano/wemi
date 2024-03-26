import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { errore } = tabelle;
  return await knex.schema.createTable(errore, function (t) {
   t.integer('cd_errore');
   t.string('tl_descrizione_errore');
  });
      };

exports.down = function (knex) {
  const { errore } = tabelle;
  return knex.schema.dropTable(errore);
};