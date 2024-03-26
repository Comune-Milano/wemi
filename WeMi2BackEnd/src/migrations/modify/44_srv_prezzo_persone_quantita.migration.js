import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { srv_prezzo_persone_quantita } = tabelle;
  return await knex.schema.alterTable(srv_prezzo_persone_quantita, function (t) {
    t.foreign('id_prezzo_persone').references('id_prezzo_persone').inTable('srv_prezzo_persone');
  });
      };

exports.down = function (knex) {
  const { srv_prezzo_persone_quantita } = tabelle;
  return knex.schema.dropTable(srv_prezzo_persone_quantita);
};