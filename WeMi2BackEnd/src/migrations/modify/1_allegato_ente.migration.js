import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { allegato_ente } = tabelle;
  return await knex.schema.alterTable(allegato_ente, function (t) {
    t.foreign('id_ente').references('id_ente').inTable('ente');
    t.foreign('id_media').references('id_media').inTable('media');
  });
      };

exports.down = function (knex) {
  const { allegato_ente } = tabelle;
  return knex.schema.dropTable(allegato_ente);
};