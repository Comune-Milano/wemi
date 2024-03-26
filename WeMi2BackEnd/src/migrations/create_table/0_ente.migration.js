import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { ente } = tabelle;
  return await knex.schema.createTable(ente, function (t) {
    t.integer('id_ente').primary().notNull();
    t.string('id_partita_iva_ente',11).notNull();
    t.string('nm_ente');
    t.string('nm_ente_completo');
    t.integer('id_utente_admin').notNull();
    t.integer('pg_versione');
    t.integer('id_ente_rif');
    t.date('dt_inizio_val');
    t.date('dt_fine_val');
    t.timestamp('ts_creazione');
  });
      };

exports.down = function (knex) {
  const { ente } = tabelle;
  return knex.schema.dropTable(ente);
};
