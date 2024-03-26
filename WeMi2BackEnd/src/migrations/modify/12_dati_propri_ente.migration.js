import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { datiPropriEnte } = tabelle;
  return await knex.schema.alterTable(datiPropriEnte, function (t) {
    t.foreign('id_ente_rif').references('id_ente').inTable('ente');
    t.foreign('id_img_logo').references('id_media').inTable('media');
    t.foreign('id_pdf_tc').references('id_media').inTable('media');
  });
      };

exports.down = function (knex) {
  const { datiPropriEnte } = tabelle;
  return knex.schema.dropTable(datiPropriEnte);
};