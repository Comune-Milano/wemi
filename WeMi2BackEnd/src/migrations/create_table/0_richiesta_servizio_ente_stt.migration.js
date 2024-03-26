import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { richiesta_servizio_ente_stt } = tabelle;
  return await knex.schema.createTable(richiesta_servizio_ente_stt, function (t) {
    t.primary(['id_richiesta_servizio_ente','ts_variazione_stato']);
    t.integer('id_richiesta_servizio_ente').notNull();
    t.timestamp('ts_variazione_stato').notNull();
    t.string('cd_stato_ric_serv_ente',20).notNull();
    t.string('cd_stato_chat',20).notNull();
    t.integer('id_utente');
  });
      };

exports.down = function (knex) {
  const { richiesta_servizio_ente_stt } = tabelle;
  return knex.schema.dropTable(richiesta_servizio_ente_stt);
};
