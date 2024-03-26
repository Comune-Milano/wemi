import tabelle from 'tabelle';
import { fixtureValAttributoOffServ } from '../fixtures/val_attributo_offerta_servizio.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { val_attributo_offerta_servizio } = tabelle;
  await knex(val_attributo_offerta_servizio).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureValAttributoOffServ.map(off =>({
  id_utente_lav:off.idUtenteLav,
  id_servizio_riferimento:off.idServizio,
  cd_attributo:off.cdAttributo,
  cd_val_attributo:off.cdValAttributo,
  tx_val:off.txVal,
  dt_val:off.dtVal,
  tx_nota:off.txNota,
  tx_nota_op:off.txNotaOp,
  nr_val:off.nrVal,
  fg_val:off.fgVal,
  ts_modifica:off.tsUltModifica,
  ts_creazione:off.tsCreazione
    }));
  return await knex(val_attributo_offerta_servizio).insert(fixtureMapped);

};