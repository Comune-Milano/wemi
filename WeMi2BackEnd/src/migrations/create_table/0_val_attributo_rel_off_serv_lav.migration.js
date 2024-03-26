import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_rel_off_serv_lav} = tabelle;
  return await knex.schema.createTable(val_attributo_rel_off_serv_lav, function (t) {
    t.primary(['id_utente_lav','id_servizio_riferimento','cd_attributo_1','cd_val_attributo_1','cd_attributo_2','cd_val_attributo_2']);
    t.integer('id_utente_lav').notNull();
    t.integer('id_servizio_riferimento').notNull();
    t.decimal('cd_attributo_1',3).notNull();
    t.decimal('cd_val_attributo_1',3).notNull();
    t.decimal('cd_attributo_2',3).notNull();
    t.decimal('cd_val_attributo_2',3).notNull();
  });
      };

exports.down = function (knex) {
  const { val_attributo_rel_off_serv_lav } = tabelle;
  return knex.schema.dropTable(val_attributo_rel_off_serv_lav);
};
