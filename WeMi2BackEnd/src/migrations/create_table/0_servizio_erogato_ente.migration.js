import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { servizio_erogato_ente } = tabelle;
  return await knex.schema.createTable(servizio_erogato_ente, function (t) {
    t.integer('id_servizio_ente').primary().notNull();
    t.integer('id_servizio_riferimento').notNull();
    t.integer('id_ente_erogatore').notNull();
    t.json('tl_descrizione_serv_erog_ente');
    t.integer('qt_tempo_max_attivazione');
    t.decimal('im_prezzo_minimo',9,2);
    t.decimal('im_prezzo_minimo_offerta_calc',9,2);
    t.date('dt_inizio_val_offerta_prezzo');
    t.date('dt_fine_val_offerta_prezzo');
    t.integer('cd_tipo_offerta_srv');
    t.integer('id_sede_erogazione_srv');
    t.string('tx_altra_sede',1000);
    t.string('tx_altre_mansioni',1000);
    t.json('js_dati_prezzo');
    t.json('js_info_personale');
    t.integer('cd_modalita_erogazione');
    t.integer('cd_tipo_servizio_erog');
    t.integer('qt_min_pers');
    t.integer('qt_max_pers');
    t.date('dt_inizio_erog_serv');
    t.date('dt_fine_erog_serv');
    t.json('js_note_adminwemi_su_servizio');
    t.string('fg_accetta_preventivo',1);
    t.integer('pg_versione');
    t.timestamp('ts_creazione').notNull();
    t.json('tl_procedura_attivazione');
    t.string('tx_note_al_prezzo',1000);
  });
      };

exports.down = function (knex) {
  const { servizio_erogato_ente } = tabelle;
  return knex.schema.dropTable(servizio_erogato_ente);
};
