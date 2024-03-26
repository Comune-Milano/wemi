import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { utente } = tabelle;
  return await knex.schema.createTable(utente, function (t) {
    t.integer('id_utente').primary().notNull();
    t.string('cd_profilo_utente',20).notNull();
    t.string('fg_accettazione_privacy_wemi',1);
    t.string('ptx_codice_fiscale',16);
    t.string('ptx_username',255);
    t.string('ptx_codana',255);
    t.integer('ty_operatore_ente');
    t.string('fg_lavoratore',1);
    t.string('ptx_email',255);
    t.string('tx_nome_utente',50);
    t.string('tx_cognome_utente',255);
    t.decimal('cd_sesso_utente',3);
    t.date('dt_nascita');
    t.json('js_anagrafica_residenza');
    t.timestamp('ts_primo_login');
    t.timestamp('ts_creazione');
    t.timestamp('ts_ultima_modifica');
  });
      };

exports.down = function (knex) {
  const { utente } = tabelle;
  return knex.schema.dropTable(utente);
};
