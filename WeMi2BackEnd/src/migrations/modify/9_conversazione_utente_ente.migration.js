import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { conversazione_utente_ente } = tabelle;
  return await knex.schema.alterTable(conversazione_utente_ente, function (t) {
    t.foreign('id_richiesta_servizio_ente').references('id_richiesta_servizio_ente').inTable('richiesta_servizio_ente');
  });
      };

exports.down = function (knex) {
  const { conversazione_utente_ente } = tabelle;
  return knex.schema.dropTable(conversazione_utente_ente);
};