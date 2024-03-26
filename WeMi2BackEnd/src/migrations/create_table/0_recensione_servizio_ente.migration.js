import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { recensione_ente } = tabelle;
  return await knex.schema.createTable(recensione_ente, function (t) {
    t.integer('id_rich_serv_rec').primary().notNull();
    t.integer('qt_media_singola_recensione');
    t.json('js_dati_recensione');
    t.json('js_dati_recensione_wemi');
    t.timestamp('ts_creazione').notNull();
    t.string('cd_stato_rec',20);
    t.string('cd_stato_rec_wemi',20);
  });
      };

exports.down = function (knex) {
  const { recensione_ente } = tabelle;
  return knex.schema.dropTable(recensione_ente);
};
