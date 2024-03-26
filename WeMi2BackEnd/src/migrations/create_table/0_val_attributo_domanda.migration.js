import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_domanda} = tabelle;
  return await knex.schema.createTable(val_attributo_domanda, function (t) {
    t.primary(['id_richiesta_servizio_tcb','cd_attributo','cd_val_attributo']);
    t.integer('id_richiesta_servizio_tcb').notNull();
    t.decimal('cd_attributo',3).notNull();
    t.decimal('cd_val_attributo',3).notNull();
    t.string('tx_val',255);
    t.date('dt_val');
    t.string('tx_nota',255);
    t.string('tx_nota_op',255);
    t.string('fg_val',1);
    t.integer('nr_val');
    t.string('fg_mansione_svolta',1);
    t.timestamp('ts_modifica');
    t.timestamp('ts_creazione');
  });
      };

exports.down = function (knex) {
  const { val_attributo_domanda } = tabelle;
  return knex.schema.dropTable(val_attributo_domanda);
};
