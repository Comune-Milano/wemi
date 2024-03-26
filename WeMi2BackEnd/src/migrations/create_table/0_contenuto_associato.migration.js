import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { contenuto_associato } = tabelle;
  return await knex.schema.createTable(contenuto_associato, function (t) {
    t.primary(['id_contenuto_primario','id_contenuto_associato']);
    t.integer('id_contenuto_primario').notNull();
    t.integer('id_contenuto_associato').notNull();
    t.string('nm_relazione').notNull();
    t.timestamp('ts_creazione').notNull();
  });
      };

exports.down = function (knex) {
  const { contenuto_associato } = tabelle;
  return knex.schema.dropTable(contenuto_associato);
};
