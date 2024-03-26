import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { utente_offerta_lav } = tabelle;
  return await knex.schema.createTable(utente_offerta_lav, function (t) {
    t.integer('id_utente_lav').primary().notNull();
    t.string('fg_idoneita',1);
    t.date('dt_disponibile_dal');
    t.date('dt_iscrizione');
    t.string('tx_nota_operatore',1000);
    t.decimal('cd_ultimo_stato_offerta',3);
    t.integer('id_ult_operatore',1);
    t.timestamp('ts_ultima_modifica');
    t.timestamp('ts_creazione');
    t.string('cd_stato_pag_anagrafica',20);
    t.string('cd_stato_pag_stato_occup',20);
    t.string('cd_stato_pag_istruzione',20);
    t.string('cd_stato_pag_esp_lav',20);
    t.string('cd_stato_pag_dati_pers',20);
    t.string('cd_stato_pag_comp_tata',20);
    t.string('cd_stato_pag_esp_tata',20);
    t.string('cd_stato_pag_disp_tata',20);
    t.string('cd_stato_pag_comp_colf',20);
    t.string('cd_stato_pag_esp_colf',20);
    t.string('cd_stato_pag_disp_colf',20);
    t.string('cd_stato_pag_comp_badante',20);
    t.string('cd_stato_pag_esp_badante',20);
    t.string('cd_stato_pag_disp_badante',20);
    t.string('cd_stato_pag_candidatura',20);
    t.string('fg_candidatura_tata',1);
    t.string('fg_candidatura_colf',1);
    t.string('fg_candidatura_badante',1);
  });
      };

exports.down = function (knex) {
  const { utente_offerta_lav } = tabelle;
  return knex.schema.dropTable(utente_offerta_lav);
};
