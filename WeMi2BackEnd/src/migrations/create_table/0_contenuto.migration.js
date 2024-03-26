import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { contenuto } = tabelle;
  return await knex.schema.createTable(contenuto, function (t) {
    t.integer('id_contenuto').primary().notNull();
    t.integer('ty_contenuto');
    t.integer('id_contenuto_rif').notNull();
    t.integer('ty_sottotipo_contenuto');
    t.integer('nr_ordine_visualizzazione');
    t.integer('pg_versione');
    t.json('tl_testo_1');
    t.json('tl_testo_2');
    t.json('tl_testo_3');
    t.json('tl_testo_4');
    t.json('tl_testo_5');
    t.string('ln_link_1');
    t.string('ln_link_2');
    t.integer('id_media1');
    t.integer('id_media2');
    t.integer('id_media3');
    t.date('dt_inizio_val');
    t.date('dt_fine_val');
    t.json('js_dati_contenuto');
    t.timestamp('ts_creazione').notNull();
  });
      };

exports.down = function (knex) {
  const { contenuto } = tabelle;
  return knex.schema.dropTable(contenuto);
};
