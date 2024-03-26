import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { r_fascia_oraria_erog_srv_ente } = tabelle;
  return await knex.schema.alterTable(r_fascia_oraria_erog_srv_ente, function (t) {
    t.foreign('cd_fascia_oraria_erog_srv_ente').references('cd_fascia_oraria').inTable('d_fascia_oraria');
    t.foreign('id_servizio_ente').references('id_servizio_ente').inTable('servizio_erogato_ente');
  });
      };

exports.down = function (knex) {
  const { r_fascia_oraria_erog_srv_ente } = tabelle;
  return knex.schema.dropTable(r_fascia_oraria_erog_srv_ente);
};