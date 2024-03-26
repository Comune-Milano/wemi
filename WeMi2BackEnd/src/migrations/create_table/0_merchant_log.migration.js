import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { merchant_log } = tabelle;
  return await knex.schema.createTable(merchant_log, function (t) {
    t.integer('id_ente').notNull();
    t.string('id_merchant').notNull();
    t.string('id_public_key').notNull();
    t.string('id_private_key').notNull();
    t.date('dt_inizio_val');
    t.date('dt_fine_val');
    t.timestamp('ts_creazione');
    t.integer('id_utente');
  });
      };

exports.down = function (knex) {
  const { merchant_log } = tabelle;
  return knex.schema.dropTable(merchant_log);
};
