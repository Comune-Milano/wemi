import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_cat_acc_ente } = tabelle;
  return await knex.schema.alterTable(r_cat_acc_ente, function (t) {
    t.foreign('id_cat_accreditamento').references('id_contenuto').inTable('contenuto');
    t.foreign('id_ente').references('id_ente').inTable('ente');
  });
      };

exports.down = function (knex) {
  const { r_cat_acc_ente } = tabelle;
  return knex.schema.dropTable(r_cat_acc_ente);
};