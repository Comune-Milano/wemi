import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { minimo_contrattuale_tcb } = tabelle;
  return await knex.schema.createTable(minimo_contrattuale_tcb, function (t) {
    t.primary(['nr_anno_rif','ty_dominio_tcb','cd_tipo_orario_lavoro','cd_categoria_contrattuale','cd_livello_contrattuale']);
    t.integer('nr_anno_rif').notNull();
    t.integer('ty_dominio_tcb',3).notNull();
    t.integer('cd_tipo_orario_lavoro',3).notNull();
    t.string('cd_categoria_contrattuale',2).notNull();
    t.string('cd_livello_contrattuale',2).notNull();
    t.decimal('im_importo_contributo',9,2);
    t.decimal('im_importo_indennita',9,2);
  });
      };

exports.down = function (knex) {
  const { minimo_contrattuale_tcb } = tabelle;
  return knex.schema.dropTable(minimo_contrattuale_tcb);
};
