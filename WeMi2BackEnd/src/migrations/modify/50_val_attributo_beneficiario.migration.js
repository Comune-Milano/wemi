import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_beneficiario } = tabelle;
  return await knex.schema.alterTable(val_attributo_beneficiario, function (t) {
    t.foreign('cd_attributo').references('cd_attributo').inTable('attributo');
    t.foreign(['pg_beneficiario_richiesta_tcb','id_richiesta_servizio_tcb']).references(['pg_beneficiario_richiesta_tcb','id_richiesta_servizio_tcb']).inTable('beneficiario_ric_serv_tcb');
    // t.foreign('id_richiesta_servizio_tcb').references('id_richiesta_servizio_tcb').inTable('beneficiario_ric_serv_tcb');
  });
      };

exports.down = function (knex) {
  const { val_attributo_beneficiario } = tabelle;
  return knex.schema.dropTable(val_attributo_beneficiario);
};