import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { srv_prezzo_persone } = tabelle;
  return await knex.schema.createTable(srv_prezzo_persone, function (t) {
    t.integer('id_prezzo_persone').primary().notNull();
    t.integer('id_prezzo').notNull();
    t.integer('qt_persone_da');
    t.integer('qt_persone_a');
  });
      };

exports.down = function (knex) {
  const { srv_prezzo_persone } = tabelle;
  return knex.schema.dropTable(srv_prezzo_persone);
};
