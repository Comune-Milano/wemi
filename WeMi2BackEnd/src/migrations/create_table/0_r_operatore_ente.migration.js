import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_operatore_ente } = tabelle;
  return await knex.schema.createTable(r_operatore_ente, function (t) {
    t.primary(['id_utente','id_ente']);
    t.integer('id_utente').notNull();
    t.integer('id_ente').notNull();
  });
      };

exports.down = function (knex) {
  const { r_operatore_ente } = tabelle;
  return knex.schema.dropTable(r_operatore_ente);
};
