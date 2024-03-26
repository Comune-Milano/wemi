import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_match_ric_lav } = tabelle;
  return await knex.schema.createTable(r_match_ric_lav, function (t) {
    t.integer('id_richiesta').notNull();
    t.integer('id_lavoratore').notNull();
    t.integer('id_ult_operatore').notNull();
    t.string('cd_stato_associazione',20).notNull();
    t.string('tx_nota');
    t.timestamp('ts_ultima_modifica');
    t.timestamp('ts_creazione');
    t.primary(['id_richiesta','id_lavoratore']);
  });
      };

exports.down = function (knex) {
  const { r_match_ric_lav } = tabelle;
  return knex.schema.dropTable(r_match_ric_lav);
};
