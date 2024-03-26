import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_rel_off_serv_lav } = tabelle;
  return await knex.schema.alterTable(val_attributo_rel_off_serv_lav, function (t) {
    t.foreign(['cd_val_attributo_1','id_utente_lav','cd_attributo_1','id_servizio_riferimento']).references(['cd_val_attributo','id_utente_lav','cd_attributo','id_servizio_riferimento']).inTable('val_attributo_offerta_servizio');
  });
      };

exports.down = function (knex) {
  const { val_attributo_rel_off_serv_lav } = tabelle;
  return knex.schema.dropTable(val_attributo_rel_off_serv_lav);
};