import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { richiesta_servizio_base_stt } = tabelle;
  return await knex.schema.alterTable(richiesta_servizio_base_stt, function (t) {
    t.foreign('id_richiesta_servizio').references('id_richiesta_servizio_base').inTable('richiesta_servizio_base');
  });
      };

exports.down = function (knex) {
  const { richiesta_servizio_base_stt } = tabelle;
  return knex.schema.dropTable(richiesta_servizio_base_stt);
};