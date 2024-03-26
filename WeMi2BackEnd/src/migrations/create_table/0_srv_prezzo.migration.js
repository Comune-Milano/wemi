import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { srv_prezzo } = tabelle;
  return await knex.schema.createTable(srv_prezzo, function (t) {
    t.integer('id_prezzo').primary().notNull();
    t.integer('id_servizio_ente').notNull();
    t.integer('cd_tipo_offerta_srv');
    t.date('dt_inizio');
    t.date('dt_fine');
    t.string('tx_titolo_finanziamento',200);
    t.integer('qt_minima_unita');
    t.decimal('im_prezzo_minimo',9,2);
    t.decimal('im_prezzo_minimo_cond',9,2);
    t.integer('cd_tipo_servizio_erog');
    t.string('tx_note_al_prezzo',1000);
    t.timestamp('ts_creazione');
  });
      };

exports.down = function (knex) {
  const { srv_prezzo } = tabelle;
  return knex.schema.dropTable(srv_prezzo);
};
