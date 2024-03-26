import tabelle from 'tabelle';
import { fixtureValAttributoCalOff } from '../fixtures/val_attributo_cal_off_serv_lav.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { val_attributo_cal_off_serv_lav } = tabelle;
  await knex(val_attributo_cal_off_serv_lav).delete();
  // Inserts seed entriesfixtureRMunicipioServ
  const fixtureMapped = fixtureValAttributoCalOff.map(val =>({
  id_utente_lav:val.idUtenteLav,
  id_servizio_riferimento:val.idServizio,
  cd_attributo_orario_lav:val.cdAttributo,
  cd_val_attributo_orario_lav:val.cdValAttributo,
  tx_lunedi:val.txLunedi,
  tx_martedi:val.txMartedi,
  tx_mercoledi:val.txMercoledi,
  tx_giovedi:val.txGiovedi,
  tx_venerdi:val.txVenerdi,
  tx_sabato:val.txSabato,
  tx_domenica:val.txDomenica,
  nr_ore_totali:val.nrOreTotali,
  ts_modifica:val.tsUltModifica,
  ts_creazione:val.tsCreazione
    }));
  return await knex(val_attributo_cal_off_serv_lav).insert(fixtureMapped);

};