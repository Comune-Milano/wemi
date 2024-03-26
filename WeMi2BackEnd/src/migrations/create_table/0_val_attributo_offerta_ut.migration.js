import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { val_attributo_offerta_ut} = tabelle;
  return await knex.schema.createTable(val_attributo_offerta_ut, function (t) {
    t.primary(['id_utente_offerta_lav','cd_attributo','cd_val_attributo']);
    t.integer('id_utente_offerta_lav').notNull();
    t.decimal('cd_attributo',3).notNull();
    t.decimal('cd_val_attributo',3).notNull();
    t.string('tx_val',255);
    t.date('dt_val');
    t.string('tx_nota',255);
    t.string('tx_nota_op',255);
    t.string('fg_val',1);
    t.integer('nr_val');
    t.timestamp('ts_modifica');
    t.timestamp('ts_creazione');
  });
      };

exports.down = function (knex) {
  const { val_attributo_offerta_ut } = tabelle;
  return knex.schema.dropTable(val_attributo_offerta_ut);
};
