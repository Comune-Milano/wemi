import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { servizio_tag } = tabelle;
  return await knex.schema.createTable(servizio_tag, function (t) {
    t.integer('id_servizio').notNull();
    t.string('tx_tag_ricerca',200).notNull();
  });
      };

exports.down = function (knex) {
  const { servizio_tag } = tabelle;
  return knex.schema.dropTable(servizio_tag);
};
