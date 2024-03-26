import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { conversazione_utente_ente } = tabelle;
  return await knex.schema.createTable(conversazione_utente_ente, function (t) {
    t.integer('id_conversazione_ut_ente').primary().notNull();
    t.integer('id_richiesta_servizio_ente').notNull();
    t.string('tx_testo_messaggio')
    t.integer('id_utente_autore_msg')
    t.string('fg_msg_ente',1);
    t.timestamp('ts_creazione').notNull();
  });
      };

exports.down = function (knex) {
  const { conversazione_utente_ente } = tabelle;
  return knex.schema.dropTable(conversazione_utente_ente);
};
