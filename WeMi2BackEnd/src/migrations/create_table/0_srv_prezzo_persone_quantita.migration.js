import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { srv_prezzo_persone_quantita } = tabelle;
  return await knex.schema.createTable(srv_prezzo_persone_quantita, function (t) {
    t.integer('id_quantita').primary().notNull();
    t.integer('id_prezzo_persone').notNull();
    t.integer('qt_unita_da');
    t.integer('qt_unita_a');
    t.decimal('valore',9,2);
  });
      };

exports.down = function (knex) {
  const { srv_prezzo_persone_quantita } = tabelle;
  return knex.schema.dropTable(srv_prezzo_persone_quantita);
};
