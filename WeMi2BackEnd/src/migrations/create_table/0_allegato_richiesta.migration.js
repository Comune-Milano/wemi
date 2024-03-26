import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { allegato_richiesta } = tabelle;
  return await knex.schema.createTable(allegato_richiesta, function (t) {
    t.integer('id_allegato').primary().notNull();
    t.integer('id_richiesta').notNull();
    t.integer('id_lavoratore').notNull();
    t.string('nm_nome_allegato_ric').notNull();
    t.binary('oj_allegato_ric');
    t.timestamp('ts_creazione');
  });
      };

exports.down = function (knex) {
  const { allegato_richiesta } = tabelle;
  return knex.schema.dropTable(allegato_richiesta);
};
