import tabelle from 'tabelle';
import { fixtureParamGenerale } from '../fixtures/parametro_generale.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { parametro_generale } = tabelle;
  await knex(parametro_generale).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureParamGenerale.map(parametro =>({
  nome_parametro:parametro.nomeParam,
  valore_tx_parametro:parametro.valoreTx,
  valore_dt_parametro:parametro.valoreDt
    }));
  return await knex(parametro_generale).insert(fixtureMapped);

};