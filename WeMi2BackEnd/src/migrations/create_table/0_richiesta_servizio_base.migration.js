import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { richiesta_servizio_base } = tabelle;
  return await knex.schema.createTable(richiesta_servizio_base, function (t) {
    t.integer('id_richiesta_servizio_base').primary().notNull();
    t.date('dt_periodo_richiesto_dal');
    t.date('dt_periodo_richiesto_al');
    t.integer('id_utente_richiedente').notNull();
    t.json('js_dati_richiesta');
    t.date('dt_inizio_val');
    t.date('dt_fine_val');
    t.timestamp('ts_creazione').notNull();
    t.string('ds_servizio',255);
    t.timestamp('ts_variazione_stato');
    t.string('cd_stato_richiesta_servizio',20);
    t.integer('id_utente');
  });
      };

exports.down = function (knex) {
  const { richiesta_servizio_base } = tabelle;
  return knex.schema.dropTable(richiesta_servizio_base);
};
