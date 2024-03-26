import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_tipologia_orario_conv_tcb } = tabelle;
  return await knex.schema.createTable(d_tipologia_orario_conv_tcb, function (t) {
    t.integer('cd_tipologia_orario',3).primary().notNull();
    t.json('tl_valore_testuale');
    t.integer('pg_visualizzazione');
  });
      };

exports.down = function (knex) {
  const { d_tipologia_orario_conv_tcb } = tabelle;
  return knex.schema.dropTable(d_tipologia_orario_conv_tcb);
};
