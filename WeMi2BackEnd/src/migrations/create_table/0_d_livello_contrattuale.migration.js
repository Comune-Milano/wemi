import tabelle from 'tabelle';

exports.up = async function (knex, Promise) {
  const { d_livello_contrattuale } = tabelle;
  return await knex.schema.createTable(d_livello_contrattuale, function (t) {
    t.primary(['cd_livello_contrattuale','id_servizio_riferimento']);
    t.string('cd_livello_contrattuale',2).notNull();
    t.integer('id_servizio_riferimento').notNull();
    t.json('tl_valore_testuale_breve');
    t.json('tl_valore_testuale_lungo');
    t.integer('pg_visualizzazione');
  });
      };

exports.down = function (knex) {
  const { d_livello_contrattuale } = tabelle;
  return knex.schema.dropTable(d_livello_contrattuale);
};
