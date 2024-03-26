import sequence from 'sequence';

exports.up = async function (knex, Promise) {
  const { seq_servizio_erogato_ente } = sequence;
  return await knex.raw(`CREATE SEQUENCE ${seq_servizio_erogato_ente}
  INCREMENT 1
  START 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  CACHE 1;`
  )};

exports.down = function (knex) {
  const { seq_servizio_erogato_ente } = sequence;
  return knex.schema.raw(`DROP SEQUENCE ${seq_servizio_erogato_ente};`);
};
