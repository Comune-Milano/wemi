import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { recensione_ente_stt } = tabelle;
  return await knex.schema.createTable(recensione_ente_stt, function (t) {
    t.primary(['id_rich_serv_rec','ts_variazione_stato']);
    t.integer('id_rich_serv_rec').notNull();
    t.timestamp('ts_variazione_stato').notNull();
    t.integer('cd_stato_recensione').notNull();
    t.integer('id_utente');
  });
      };

exports.down = function (knex) {
  const { recensione_ente_stt } = tabelle;
  return knex.schema.dropTable(recensione_ente_stt);
};
