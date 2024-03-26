import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_ut } = tabelle;
  return await knex.schema.alterTable(val_attributo_ut, function (t) {
    t.foreign('cd_attributo').references('cd_attributo').inTable('attributo');
    t.foreign('id_utente').references('id_utente').inTable('utente');
  });
      };

exports.down = function (knex) {
  const { val_attributo_ut } = tabelle;
  return knex.schema.dropTable(val_attributo_ut);
};