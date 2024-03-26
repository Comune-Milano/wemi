import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_rel_dom_serv_lav } = tabelle;
  return await knex.schema.alterTable(val_attributo_rel_dom_serv_lav, function (t) {
    t.foreign(['cd_attributo_1','cd_val_attributo_1','id_richiesta_servizio_tcb']).references(['cd_attributo','cd_val_attributo','id_richiesta_servizio_tcb']).inTable('val_attributo_domanda');
  });
      };

exports.down = function (knex) {
  const { val_attributo_rel_dom_serv_lav } = tabelle;
  return knex.schema.dropTable(val_attributo_rel_dom_serv_lav);
};