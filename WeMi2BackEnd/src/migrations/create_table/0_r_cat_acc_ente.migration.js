import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_cat_acc_ente } = tabelle;
  return await knex.schema.createTable(r_cat_acc_ente, function (t) {
    t.primary(['id_ente','id_cat_accreditamento']);
    t.integer('id_ente').notNull();
    t.integer('id_cat_accreditamento').notNull();
  });
      };

exports.down = function (knex) {
  const { r_cat_acc_ente } = tabelle;
  return knex.schema.dropTable(r_cat_acc_ente);
};
