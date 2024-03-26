import tabelle from 'tabelle';
import { fixtureValAttributoOffUt } from '../fixtures/val_attributo_offerta_ut.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { val_attributo_offerta_ut } = tabelle;
  await knex(val_attributo_offerta_ut).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureValAttributoOffUt.map(val =>({
  id_utente_offerta_lav:val.idUtenteOffertaLav,
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
  return await knex(val_attributo_offerta_ut).insert(fixtureMapped);

};