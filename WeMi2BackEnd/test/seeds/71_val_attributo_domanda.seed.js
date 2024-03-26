import tabelle from 'tabelle';
import { fixtureValAttributoDomanda } from '../fixtures/val_attributo_domanda.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { val_attributo_domanda } = tabelle;
  await knex(val_attributo_domanda).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureValAttributoDomanda.map(val =>({
  id_richiesta_servizio_tcb:val.idRichTcb,
  cd_attributo:val.cdAttributo,
  cd_val_attributo:val.cdValAttributo,
  tx_val:val.txVal,
  dt_val:val.dtVal,
  tx_nota:val.txNota,
  tx_nota_op:val.txNotaOp,
  fg_val:val.fgVal,
  nr_val:val.nrVal,
  fg_mansione_svolta:val.fgMansione,
  ts_modifica:val.tsUltModifica,
  ts_creazione:val.tsCreazione
    }));
  return await knex(val_attributo_domanda).insert(fixtureMapped);

};