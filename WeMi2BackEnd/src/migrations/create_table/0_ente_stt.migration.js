import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { ente_stt } = tabelle;
  return await knex.schema.createTable(ente_stt, function (t) {
    t.primary(['id_ente','ts_variazione_stato']);
    t.integer('id_ente').notNull();
    t.timestamp('ts_variazione_stato').notNull();
    t.integer('cd_stato_ente').notNull();
    t.integer('id_utente').notNull();
  });
      };

exports.down = function (knex) {
  const { ente_stt } = tabelle;
  return knex.schema.dropTable(ente_stt);
};
