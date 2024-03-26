import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { richiesta_servizio_ente } = tabelle;
  return await knex.schema.createTable(richiesta_servizio_ente, function (t) {
    t.integer('id_richiesta_servizio_ente').primary().notNull();
    t.integer('id_richiesta_servizio_base').notNull();
    t.integer('id_servizio_erogato_ente').notNull();
    t.integer('id_interno_trans_pag');
    t.decimal('im_costo_totale_calcolato',9,2);
    t.decimal('im_costo_totale_ente',9,2);
    t.json('js_dati_lavoratore');
    t.date('dt_periodo_proposto_dal');
    t.date('dt_periodo_proposto_al');
    t.integer('cd_fascia_oraria_proposta');
    t.timestamp('ts_scadenza_acquisto');
    t.string('tx_note_ente',1000);
    t.integer('id_preventivo_ente');
    t.timestamp('ts_creazione').notNull();
  });
      };

exports.down = function (knex) {
  const { richiesta_servizio_ente } = tabelle;
  return knex.schema.dropTable(richiesta_servizio_ente);
};
