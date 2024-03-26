import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { servizio_erogato_ente } = tabelle;
  return await knex.schema.alterTable(servizio_erogato_ente, function (t) {
    t.foreign('id_sede_erogazione_srv').references('id_sede').inTable('sede_ente');
    t.foreign('id_ente_erogatore').references('id_ente').inTable('ente');
    t.foreign('cd_tipo_offerta_srv').references('cd_tipo_offerta_srv').inTable('d_tipo_offerta');
    t.foreign('id_servizio_riferimento').references('id_servizio').inTable('servizio');
    t.foreign('cd_modalita_erogazione').references('cd_modalita_erogazione').inTable('d_modalita_erogazione');
    t.foreign('cd_tipo_servizio_erog').references('cd_tipo_servizio').inTable('d_tipo_servizio');
  });
      };

exports.down = function (knex) {
  const { servizio_erogato_ente } = tabelle;
  return knex.schema.dropTable(servizio_erogato_ente);
};