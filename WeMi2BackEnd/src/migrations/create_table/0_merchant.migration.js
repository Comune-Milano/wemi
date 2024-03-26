import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { merchant } = tabelle;
  return await knex.schema.createTable(merchant, function (t) {
    t.primary(['id_ente','id_merchant','id_public_key','id_private_key']);
    t.integer('id_ente').notNull();
    t.string('id_merchant').notNull();
    t.string('id_public_key').notNull();
    t.string('id_private_key').notNull();
    t.date('dt_inizio_val');
    t.date('dt_fine_val');
    t.timestamp('ts_creazione');
  });
      };

exports.down = function (knex) {
  const { merchant } = tabelle;
  return knex.schema.dropTable(merchant);
};
