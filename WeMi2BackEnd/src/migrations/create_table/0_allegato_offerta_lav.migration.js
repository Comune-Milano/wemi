import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { allegato_offerta_lav } = tabelle;
  return await knex.schema.createTable(allegato_offerta_lav, function (t) {
    t.integer('id_allegato').primary().notNull();
    t.integer('id_utente_lav').notNull();
    t.string('nm_nome_allegato_off').notNull();
    t.binary('oj_allegato_off');
    t.timestamp('ts_creazione');
  });
      };

exports.down = function (knex) {
  const { allegato_offerta_lav } = tabelle;
  return knex.schema.dropTable(allegato_offerta_lav);
};
