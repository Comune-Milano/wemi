import tabelle from 'tabelle';
import { fixtureValAttributoBen } from '../fixtures/val_attributo_beneficiario.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { val_attributo_beneficiario } = tabelle;
  await knex(val_attributo_beneficiario).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureValAttributoBen.map(attributo =>({
  id_richiesta_servizio_tcb:attributo.idRichTcb,
  pg_beneficiario_richiesta_tcb:attributo.pgBeneficiario,
  cd_attributo:attributo.cdAttributo,
  cd_val_attributo:attributo.cdValAttributo,
  tx_val:attributo.txVal,
  dt_val:attributo.dtVal,
  tx_nota:attributo.txNota,
  tx_nota_op:attributo.txNotaOp,
  fg_val:attributo.fg_val,
  nr_val:attributo.nrVal,
  ts_ult_modifica:attributo.tsUltModifica,
  ts_creazione:attributo.tsCreazione
    }));
  return await knex(val_attributo_beneficiario).insert(fixtureMapped);

};