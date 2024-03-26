import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { contributo_tcb } = tabelle;
  return await knex.schema.createTable(contributo_tcb, function (t) {
    t.primary(['nr_ore_da','nr_ore_a','im_retr_effettiva_oraria_da','im_retr_effettiva_oraria_a']);
    t.integer('nr_ore_da').notNull();
    t.integer('nr_ore_a').notNull();
    t.decimal('im_retr_effettiva_oraria_da',9,2).notNull();
    t.decimal('im_retr_effettiva_oraria_a',9,2).notNull();
    t.decimal('im_contributo_orario_si_cuaf',9,2);
    t.decimal('im_contributo_orario_no_cuaf_1',9,2);
    t.decimal('im_contributo_orario_dip',9,2);
  });
      };

exports.down = function (knex) {
  const { contributo_tcb } = tabelle;
  return knex.schema.dropTable(contributo_tcb);
};
