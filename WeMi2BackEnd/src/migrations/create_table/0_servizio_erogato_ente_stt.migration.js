import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { servizio_erogato_ente_stt } = tabelle;
  return await knex.schema.createTable(servizio_erogato_ente_stt, function (t) {
    t.primary(['id_servizio_ente','ts_variazione_stato']);
    t.integer('id_servizio_ente').notNull();
    t.timestamp('ts_variazione_stato').notNull();
    t.integer('cd_stato_dati_servizio_ente').notNull();
    t.integer('id_utente');
  });
      };

exports.down = function (knex) {
  const { servizio_erogato_ente_stt } = tabelle;
  return knex.schema.dropTable(servizio_erogato_ente_stt);
};
