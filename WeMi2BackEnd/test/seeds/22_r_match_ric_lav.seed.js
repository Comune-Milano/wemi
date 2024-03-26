import tabelle from 'tabelle';
import { fixtureRMatch } from '../fixtures/r_match_ric_lav.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { r_match_ric_lav } = tabelle;
  await knex(r_match_ric_lav).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureRMatch.map(match =>({
     id_richiesta:match.idRichiesta,
     id_lavoratore:match.idLav,
     id_ult_operatore:match.idUltOp,
     cd_stato_associazione:match.cdStato,
     tx_nota:match.txNota,
     ts_ultima_modifica:match.tsModifica,
     ts_creazione:match.tsCreazione 
    }));
  return await knex(r_match_ric_lav).insert(fixtureMapped);

};