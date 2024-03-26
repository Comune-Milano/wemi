import tabelle from 'tabelle';
import { fixturePagamentoStt } from '../fixtures/pagamento_stt.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { pagamento_stt } = tabelle;
  await knex(pagamento_stt).delete();
  // Inserts seed entries
  const fixtureMapped = fixturePagamentoStt.map(pagamento =>({
   id_interno_trans_pag:pagamento.idInterno,
   ts_variazione_stato:pagamento.tsVariazione,
   cd_stato_pagamento:pagamento.cdStato,
   id_utente:pagamento.idUtente
    }));
  return await knex(pagamento_stt).insert(fixtureMapped);

};