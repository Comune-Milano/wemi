import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { beneficiario_ric_serv_tcb } = tabelle;
  return await knex.schema.createTable(beneficiario_ric_serv_tcb, function (t) {
    t.primary(['id_richiesta_servizio_tcb','pg_beneficiario_richiesta_tcb'])
    t.integer('id_richiesta_servizio_tcb').notNull();
    t.integer('pg_beneficiario_richiesta_tcb').notNull();
    t.timestamp('ts_creazione').notNull();
  });
      };

exports.down = function (knex) {
  const { beneficiario_ric_serv_tcb } = tabelle;
  return knex.schema.dropTable(beneficiario_ric_serv_tcb);
};
