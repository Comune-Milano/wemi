import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_domanda } = tabelle;
  return await knex.schema.alterTable(val_attributo_domanda, function (t) {
    t.foreign('cd_attributo').references('cd_attributo').inTable('attributo');
    t.foreign('id_richiesta_servizio_tcb').references('id_richiesta_servizio_tcb').inTable('richiesta_servizio_tcb');
  });
      };

exports.down = function (knex) {
  const { val_attributo_domanda } = tabelle;
  return knex.schema.dropTable(val_attributo_domanda);
};