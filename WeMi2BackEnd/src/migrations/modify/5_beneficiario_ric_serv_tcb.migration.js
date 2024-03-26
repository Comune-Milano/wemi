import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { beneficiario_ric_serv_tcb } = tabelle;
  return await knex.schema.alterTable(beneficiario_ric_serv_tcb, function (t) {
    t.foreign('id_richiesta_servizio_tcb').references('id_richiesta_servizio_tcb').inTable('richiesta_servizio_tcb');
  });
      };

exports.down = function (knex) {
  const { beneficiario_ric_serv_tcb } = tabelle;
  return knex.schema.dropTable(beneficiario_ric_serv_tcb);
};