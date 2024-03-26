import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { srv_prezzo_persone } = tabelle;
  return await knex.schema.alterTable(srv_prezzo_persone, function (t) {
    t.foreign('id_prezzo').references('id_prezzo').inTable('srv_prezzo');
  });
      };

exports.down = function (knex) {
  const { srv_prezzo_persone } = tabelle;
  return knex.schema.dropTable(srv_prezzo_persone);
};