import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_cal_off_serv_lav} = tabelle;
  return await knex.schema.createTable(val_attributo_cal_off_serv_lav, function (t) {
    t.primary(['id_utente_lav','id_servizio_riferimento','cd_attributo_orario_lav','cd_val_attributo_orario_lav']);
    t.integer('id_utente_lav').notNull();
    t.integer('id_servizio_riferimento').notNull();
    t.decimal('cd_attributo_orario_lav',3).notNull();
    t.decimal('cd_val_attributo_orario_lav',3).notNull();
    t.string('tx_lunedi',48).notNull();
    t.string('tx_martedi',48);
    t.string('tx_mercoledi',48);
    t.string('tx_giovedi',48);
    t.string('tx_venerdi',48);
    t.string('tx_sabato',48);
    t.string('tx_domenica',48);
    t.integer('nr_ore_totali');
    t.timestamp('ts_modifica');
    t.timestamp('ts_creazione');
  });
      };

exports.down = function (knex) {
  const { val_attributo_cal_off_serv_lav } = tabelle;
  return knex.schema.dropTable(val_attributo_cal_off_serv_lav);
};
