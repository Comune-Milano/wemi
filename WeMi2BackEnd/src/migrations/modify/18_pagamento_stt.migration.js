import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { pagamento_stt } = tabelle;
  return await knex.schema.alterTable(pagamento_stt, function (t) {
    t.foreign('id_interno_trans_pag').references('id_interno_transazione').inTable('pagamento');
  });
      };

exports.down = function (knex) {
  const { pagamento_stt } = tabelle;
  return knex.schema.dropTable(pagamento_stt);
};