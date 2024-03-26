import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_rel_dom_serv_lav} = tabelle;
  return await knex.schema.createTable(val_attributo_rel_dom_serv_lav, function (t) {
    t.primary(['id_richiesta_servizio_tcb','cd_attributo_1','cd_val_attributo_1','cd_attributo_2','cd_val_attributo_2','pg_beneficiario_richiesta_tcb']);
    t.integer('id_richiesta_servizio_tcb').notNull();
    t.decimal('cd_attributo_1',3).notNull();
    t.decimal('cd_val_attributo_1',3).notNull();
    t.decimal('cd_attributo_2',3).notNull();
    t.decimal('cd_val_attributo_2',3).notNull();
    t.integer('pg_beneficiario_richiesta_tcb').notNull();
  });
      };

exports.down = function (knex) {
  const { val_attributo_rel_dom_serv_lav } = tabelle;
  return knex.schema.dropTable(val_attributo_rel_dom_serv_lav);
};
