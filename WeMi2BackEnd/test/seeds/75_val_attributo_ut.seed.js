import tabelle from 'tabelle';
import { fixtureValAttributoUt } from '../fixtures/val_attributo_ut.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { val_attributo_ut } = tabelle;
  await knex(val_attributo_ut).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureValAttributoUt.map(val =>({
  id_utente:val.idUtente,
  cd_attributo:val.cdAttributo,
  cd_val_attributo:val.cdValAttributo,
  tx_val:val.txVal,
  dt_val:val.dtVal,
  tx_nota:val.txNota,
  tx_nota_op:val.txNotaOp,
  fg_val:val.fgVal,
  nr_val:val.nrVal,
  ts_modifica:val.tsUltModifica,
  ts_creazione:val.tsCreazione
    }));
  return await knex(val_attributo_ut).insert(fixtureMapped);

};