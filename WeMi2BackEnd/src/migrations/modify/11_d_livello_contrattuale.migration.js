import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_livello_contrattuale } = tabelle;
  return await knex.schema.alterTable(d_livello_contrattuale, function (t) {
    t.foreign('id_servizio_riferimento').references('id_servizio').inTable('servizio');
  });
      };

exports.down = function (knex) {
  const { d_livello_contrattuale } = tabelle;
  return knex.schema.dropTable(d_livello_contrattuale);
};