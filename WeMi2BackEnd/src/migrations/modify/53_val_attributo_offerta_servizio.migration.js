import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_offerta_servizio } = tabelle;
  return await knex.schema.alterTable(val_attributo_offerta_servizio, function (t) {
    t.foreign('cd_attributo').references('cd_attributo').inTable('attributo');
    t.foreign(['id_utente_lav','id_servizio_riferimento']).references(['id_utente_lav','id_servizio_riferimento']).inTable('utente_offerta_servizio');
  });
      };

exports.down = function (knex) {
  const { val_attributo_offerta_servizio } = tabelle;
  return knex.schema.dropTable(val_attributo_offerta_servizio);
};