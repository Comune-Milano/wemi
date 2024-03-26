import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_cal_off_serv_lav } = tabelle;
  return await knex.schema.alterTable(val_attributo_cal_off_serv_lav, function (t) {
    t.foreign(['id_servizio_riferimento','cd_val_attributo_orario_lav','id_utente_lav','cd_attributo_orario_lav']).references(['id_servizio_riferimento','cd_val_attributo','id_utente_lav','cd_attributo']).inTable('val_attributo_offerta_servizio');
  });
      };

exports.down = function (knex) {
  const { val_attributo_cal_off_serv_lav } = tabelle;
  return knex.schema.dropTable(val_attributo_cal_off_serv_lav);
};