import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { richiesta_servizio_tcb } = tabelle;
  return await knex.schema.createTable(richiesta_servizio_tcb, function (t) {
    t.integer('id_richiesta_servizio_tcb').primary().notNull();
    t.integer('qt_beneficiari');
    t.string('tx_lunedi_cal_disp',48);
    t.string('tx_martedi_cal_disp',48);
    t.string('tx_mercoledi_cal_disp',48);
    t.string('tx_giovedi_cal_disp',48);
    t.string('tx_venerdi_cal_disp',48);
    t.string('tx_sabato_cal_disp',48);
    t.string('tx_domenica_cal_disp',48);
    t.integer('nr_ore_totali_disp');
    t.timestamp('ts_ult_modifica');
    t.timestamp('ts_creazione').notNull();
    t.string('cd_stato_pag_beneficiario',20);
    t.string('cd_stato_pag_mansioni',20);
    t.string('cd_stato_pag_casa',20);
    t.string('cd_stato_pag_animali',20);
    t.string('cd_stato_pag_disponibilita',20);
    t.string('cd_stato_pag_preferenzelav',20);
    t.string('cd_stato_pag_sedelavoro',20);
    t.json('js_impersonificazione');
    t.decimal('nr_ore_richieste_totali',5,1);
  });
      };

exports.down = function (knex) {
  const { richiesta_servizio_tcb } = tabelle;
  return knex.schema.dropTable(richiesta_servizio_tcb);
};
