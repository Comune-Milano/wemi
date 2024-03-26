import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { utente_offerta_servizio } = tabelle;
  return await knex.schema.createTable(utente_offerta_servizio, function (t) {
    t.primary(['id_utente_lav','id_servizio_riferimento']);
    t.integer('id_utente_lav').notNull();
    t.integer('id_servizio_riferimento').notNull();
    t.integer('nr_anni_esperienza');
    t.integer('nr_voto_operatore');
    t.date('dt_disponibile_serv_dal');
    t.string('tx_lunedi',48);
    t.string('tx_martedi',48);
    t.string('tx_mercoledi',48);
    t.string('tx_giovedi',48);
    t.string('tx_venerdi',48);
    t.string('tx_sabato',48);
    t.string('tx_domenica',48);
    t.integer('nr_ore_totali');
    t.timestamp('ts_ultima_modifica');
    t.timestamp('ts_creazione');
  });
      };

exports.down = function (knex) {
  const { utente_offerta_servizio } = tabelle;
  return knex.schema.dropTable(utente_offerta_servizio);
};
