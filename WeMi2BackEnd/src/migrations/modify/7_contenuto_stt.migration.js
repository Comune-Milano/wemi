import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { contenuto_stt } = tabelle;
  return await knex.schema.alterTable(contenuto_stt, function (t) {
    t.foreign('id_contenuto').references('id_contenuto').inTable('contenuto');
    t.foreign('id_utente').references('id_utente').inTable('utente');
  });
      };

exports.down = function (knex) {
  const { contenuto_stt } = tabelle;
  return knex.schema.dropTable(contenuto_stt);
};