import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_unita_prezzo_servizio } = tabelle;
  return await knex.schema.createTable(d_unita_prezzo_servizio, function (t) {
    t.integer('cd_unita_prezzo').primary().notNull();
    t.json('tl_testo_aggettivo');
    t.json('tl_testo_sostantivo');
    t.integer('pg_visualizzazione');
  });
      };

exports.down = function (knex) {
  const { d_unita_prezzo_servizio } = tabelle;
  return knex.schema.dropTable(d_unita_prezzo_servizio);
};
