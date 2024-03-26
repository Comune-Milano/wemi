import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { servizio } = tabelle;
  return await knex.schema.alterTable(servizio, function (t) {
    t.foreign('id_categoria_accreditamento').references('id_contenuto').inTable('contenuto');
    t.foreign('id_servizio').references('id_contenuto').inTable('contenuto');
    t.foreign('cd_unita_prezzo').references('cd_unita_prezzo').inTable('d_unita_prezzo_servizio');
  });
      };

exports.down = function (knex) {
  const { servizio } = tabelle;
  return knex.schema.dropTable(servizio);
};