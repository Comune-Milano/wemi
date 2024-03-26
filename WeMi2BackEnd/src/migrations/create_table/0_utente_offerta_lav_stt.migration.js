import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { utente_offerta_lav_stt } = tabelle;
  return await knex.schema.createTable(utente_offerta_lav_stt, function (t) {
    t.primary(['id_utente_lav','ts_variazione_stato']);  
    t.integer('id_utente_lav').notNull();
    t.timestamp('ts_variazione_stato').notNull();
    t.decimal('cd_stato_dati_lav',3).notNull();
    t.integer('id_utente');
  });
      };

exports.down = function (knex) {
  const { utente_offerta_lav_stt } = tabelle;
  return knex.schema.dropTable(utente_offerta_lav_stt);
};
