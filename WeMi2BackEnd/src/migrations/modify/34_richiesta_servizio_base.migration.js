import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { richiesta_servizio_base } = tabelle;
  return await knex.schema.alterTable(richiesta_servizio_base, function (t) {
    t.foreign('id_utente_richiedente').references('id_utente').inTable('utente');
  });
      };

exports.down = function (knex) {
  const { richiesta_servizio_base } = tabelle;
  return knex.schema.dropTable(richiesta_servizio_base);
};