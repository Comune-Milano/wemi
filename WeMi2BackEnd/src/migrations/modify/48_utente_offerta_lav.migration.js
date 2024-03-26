import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { utente_offerta_lav } = tabelle;
  return await knex.schema.alterTable(utente_offerta_lav, function (t) {
    t.foreign('id_utente_lav').references('id_utente').inTable('utente');
  });
      };

exports.down = function (knex) {
  const { utente_offerta_lav } = tabelle;
  return knex.schema.dropTable(utente_offerta_lav);
};