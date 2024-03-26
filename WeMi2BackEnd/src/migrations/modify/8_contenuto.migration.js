import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { contenuto } = tabelle;
  return await knex.schema.alterTable(contenuto, function (t) {
    t.foreign('ty_contenuto').references('id').inTable('tipologia_contenuto');
    t.foreign('id_media1').references('id_media').inTable('media');
    t.foreign('id_media2').references('id_media').inTable('media');
    t.foreign('id_media3').references('id_media').inTable('media');
  });
      };

exports.down = function (knex) {
  const { contenuto } = tabelle;
  return knex.schema.dropTable(contenuto);
};