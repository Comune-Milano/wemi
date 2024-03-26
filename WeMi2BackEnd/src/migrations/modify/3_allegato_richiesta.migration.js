import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { allegato_richiesta } = tabelle;
  return await knex.schema.alterTable(allegato_richiesta, function (t) {
    t.foreign(['id_lavoratore','id_richiesta']).references(['id_lavoratore','id_richiesta']).inTable('r_match_ric_lav');
  });
      };

exports.down = function (knex) {
  const { allegato_richiesta } = tabelle;
  return knex.schema.dropTable(allegato_richiesta);
};