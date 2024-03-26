import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { richiesta_servizio_ente } = tabelle;
  return await knex.schema.alterTable(richiesta_servizio_ente, function (t) {
    t.foreign('id_preventivo_ente').references('id_media').inTable('media');
    t.foreign('id_richiesta_servizio_base').references('id_richiesta_servizio_base').inTable('richiesta_servizio_base');
    t.foreign('id_interno_trans_pag').references('id_interno_transazione').inTable('pagamento');
    t.foreign('id_servizio_erogato_ente').references('id_servizio_ente').inTable('servizio_erogato_ente');
    t.foreign('cd_fascia_oraria_proposta').references('cd_fascia_oraria').inTable('d_fascia_oraria');
  });
      };

exports.down = function (knex) {
  const { richiesta_servizio_ente } = tabelle;
  return knex.schema.dropTable(richiesta_servizio_ente);
};