import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_spazio_wemi_ente } = tabelle;
  return await knex.schema.alterTable(r_spazio_wemi_ente, function (t) {
    t.foreign('id_spazio_wemi').references('id_contenuto').inTable('contenuto');
    t.foreign('id_ente').references('id_ente').inTable('ente');
  });
      };

exports.down = function (knex) {
  const { r_spazio_wemi_ente } = tabelle;
  return knex.schema.dropTable(r_spazio_wemi_ente);
};