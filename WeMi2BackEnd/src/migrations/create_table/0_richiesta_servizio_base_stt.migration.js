import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { richiesta_servizio_base_stt } = tabelle;
  return await knex.schema.createTable(richiesta_servizio_base_stt, function (t) {
    t.primary(['id_richiesta_servizio','ts_variazione_stato']);
    t.integer('id_richiesta_servizio').notNull();
    t.timestamp('ts_variazione_stato').notNull();
    t.integer('cd_stato_richiesta_servizio').notNull();
    t.integer('id_utente');
  });
      };

exports.down = function (knex) {
  const { richiesta_servizio_base_stt } = tabelle;
  return knex.schema.dropTable(richiesta_servizio_base_stt);
};
