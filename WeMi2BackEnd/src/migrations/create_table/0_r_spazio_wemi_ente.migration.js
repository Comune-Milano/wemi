import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_spazio_wemi_ente } = tabelle;
  return await knex.schema.createTable(r_spazio_wemi_ente, function (t) {
    t.primary(['id_ente','id_spazio_wemi']);
    t.integer('id_ente').notNull();
    t.integer('id_spazio_wemi').notNull();
  });
      };

exports.down = function (knex) {
  const { r_spazio_wemi_ente } = tabelle;
  return knex.schema.dropTable(r_spazio_wemi_ente);
};
