import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { servizio_tag } = tabelle;
  return await knex.schema.alterTable(servizio_tag, function (t) {
    t.foreign('id_servizio').references('id_servizio').inTable('servizio');
  });
      };

exports.down = function (knex) {
  const { servizio_tag } = tabelle;
  return knex.schema.dropTable(servizio_tag);
};