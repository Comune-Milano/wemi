import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { media } = tabelle;
  return await knex.schema.createTable(media, function (t) {
    t.integer('id_media').primary().notNull();
    t.string('ty_mime_type_media').notNull();
    t.string('nm_nome_media').notNull();
    t.binary('oj_media');
    t.integer('ty_visib_media');
    t.timestamp('ts_creazione').notNull();
  });
      };

exports.down = function (knex) {
  const { media } = tabelle;
  return knex.schema.dropTable(media);
};
