import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { log_uso_dati_utente } = tabelle;
  return await knex.schema.createTable(log_uso_dati_utente, function (t) {
    t.timestamp('ts_creazione_attivita').primary().notNull();
    t.integer('id_utente_proprietario_dati');
    t.integer('id_utente_esecutore_attivita');
    t.integer('cd_attivita');
    t.json('js_dati_attivita');
  });
      };

exports.down = function (knex) {
  const { log_uso_dati_utente } = tabelle;
  return knex.schema.dropTable(log_uso_dati_utente);
};
