import sequence from 'sequence';

exports.up = async function (knex, Promise) {
  const { seq_pagamento } = sequence;
  return await knex.raw(`CREATE SEQUENCE ${seq_pagamento}
  INCREMENT 1
  START 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  CACHE 1;`
  )};

exports.down = function (knex) {
  const { seq_pagamento } = sequence;
  return knex.schema.raw(`DROP SEQUENCE ${seq_pagamento};`);
};
