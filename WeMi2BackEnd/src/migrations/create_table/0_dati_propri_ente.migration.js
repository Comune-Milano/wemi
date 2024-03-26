import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { datiPropriEnte } = tabelle;
  return await knex.schema.createTable(datiPropriEnte, function (t) {
    t.integer('id_ente_rif').primary().notNull();
    t.json('tl_descrizione_ente');
    t.integer('id_img_logo');
    t.integer('id_pdf_tc');
    t.json('js_referente');
    t.json('js_primo_contatto');
    t.json('js_altre_info');
    t.json('js_note_adminwemi');
    t.timestamp('ts_creazione').notNull();
  });
      };

exports.down = function (knex) {
  const { datiPropriEnte } = tabelle;
  return knex.schema.dropTable(datiPropriEnte);
};
