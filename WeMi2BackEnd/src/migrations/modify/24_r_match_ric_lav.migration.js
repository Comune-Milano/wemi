import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_match_ric_lav } = tabelle;
  return await knex.schema.alterTable(r_match_ric_lav, function (t) {
    t.foreign('id_ult_operatore').references('id_utente').inTable('utente');
    t.foreign('id_richiesta').references('id_richiesta_servizio_ente').inTable('richiesta_servizio_ente');
    t.foreign('id_lavoratore').references('id_utente').inTable('utente');
  });
      };

exports.down = function (knex) {
  const { r_match_ric_lav } = tabelle;
  return knex.schema.dropTable(r_match_ric_lav);
};