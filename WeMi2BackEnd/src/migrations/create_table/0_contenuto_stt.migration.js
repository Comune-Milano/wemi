import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { contenuto_stt } = tabelle;
  return await knex.schema.createTable(contenuto_stt, function (t) {
    t.primary(['id_contenuto','ts_variazione_stato']);
    t.integer('id_contenuto').notNull();
    t.timestamp('ts_variazione_stato').notNull();
    t.integer('cd_stato_contenuto').notNull();
    t.integer('id_utente').notNull();
  });
      };

exports.down = function (knex) {
  const { contenuto_stt } = tabelle;
  return knex.schema.dropTable(contenuto_stt);
};
