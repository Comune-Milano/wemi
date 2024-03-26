import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { utente_offerta_lav_stt } = tabelle;
  return await knex.schema.alterTable(utente_offerta_lav_stt, function (t) {
    t.foreign('id_utente_lav').references('id_utente_lav').inTable('utente_offerta_lav');
  });
      };

exports.down = function (knex) {
  const { utente_offerta_lav_stt } = tabelle;
  return knex.schema.dropTable(utente_offerta_lav_stt);
};