import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { contenuto_associato } = tabelle;
  return await knex.schema.alterTable(contenuto_associato, function (t) {
    t.foreign('id_contenuto_associato').references('id_contenuto').inTable('contenuto');
    t.foreign('id_contenuto_primario').references('id_contenuto').inTable('contenuto');
  });
      };

exports.down = function (knex) {
  const { contenuto_associato } = tabelle;
  return knex.schema.dropTable(contenuto_associato);
};