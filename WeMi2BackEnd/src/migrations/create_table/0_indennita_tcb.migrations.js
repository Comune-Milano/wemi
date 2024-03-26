import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { indennita_tcb } = tabelle;
  return await knex.schema.createTable(indennita_tcb, function (t) {
    t.integer('nr_anno_rif').primary().notNull();
    t.decimal('im_pranzo',9,2);
    t.decimal('im_cena',9,2);
    t.decimal('im_alloggio',9,2);   
  });
      };

exports.down = function (knex) {
  const { indennita_tcb } = tabelle;
  return knex.schema.dropTable(indennita_tcb);
};
