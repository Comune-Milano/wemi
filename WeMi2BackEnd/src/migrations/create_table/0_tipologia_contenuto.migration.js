import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { tipologia_contenuto } = tabelle;
  return await knex.schema.createTable(tipologia_contenuto, function (t) {
    t.integer('id').primary().notNull();
    t.string('ty_contenuto',255).notNull();
  });
      };

exports.down = function (knex) {
  const { tipologia_contenuto } = tabelle;
  return knex.schema.dropTable(tipologia_contenuto);
};
