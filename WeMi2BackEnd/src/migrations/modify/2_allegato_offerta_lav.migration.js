import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { allegato_offerta_lav } = tabelle;
  return await knex.schema.alterTable(allegato_offerta_lav, function (t) {
    t.foreign('id_utente_lav').references('id_utente_lav').inTable('utente_offerta_lav');
  });
      };

exports.down = function (knex) {
  const { allegato_offerta_lav } = tabelle;
  return knex.schema.dropTable(allegato_offerta_lav);
};