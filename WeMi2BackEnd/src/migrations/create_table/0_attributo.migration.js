import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { attributo } = tabelle;
  return await knex.schema.createTable(attributo, function (t) {
    t.decimal('cd_attributo', 3, 0).primary().notNull();
    t.string('cd_alf_attributo').notNull();
    t.integer('ty_attributo').notNull();
    t.integer('ty_dominio_tcb');
    t.json('js_dati_attributo');
  });
      };

exports.down = function (knex) {
  const { attributo } = tabelle;
  return knex.schema.dropTable(attributo);
};
