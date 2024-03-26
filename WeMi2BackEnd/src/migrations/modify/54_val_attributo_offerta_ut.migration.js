import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_offerta_ut } = tabelle;
  return await knex.schema.alterTable(val_attributo_offerta_ut, function (t) {
    t.foreign('cd_attributo').references('cd_attributo').inTable('attributo');
    t.foreign('id_utente_offerta_lav').references('id_utente_lav').inTable('utente_offerta_lav');
  });
      };

exports.down = function (knex) {
  const { val_attributo_offerta_ut } = tabelle;
  return knex.schema.dropTable(val_attributo_offerta_ut);
};