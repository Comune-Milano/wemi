import tabelle from 'tabelle';
import { fixtureRichiestaTcb } from '../fixtures/richiesta_servizio_tcb.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { richiesta_servizio_tcb } = tabelle;
  await knex(richiesta_servizio_tcb).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureRichiestaTcb.map(richiesta =>({
      id_richiesta_servizio_tcb:knex.raw("nextval('wemi2.seq_richiesta_servizio_tcb')"),
      qt_beneficiari:richiesta.qtBeneficiari,
      tx_lunedi_cal_disp:richiesta.txLunedi,
      tx_martedi_cal_disp:richiesta.txMartedi,
      tx_mercoledi_cal_disp:richiesta.txMercoledi,
      tx_giovedi_cal_disp:richiesta.txGiovedi,
      tx_venerdi_cal_disp:richiesta.txVenerdi,
      tx_sabato_cal_disp:richiesta.txSabato,
      tx_domenica_cal_disp:richiesta.txDomenica,
      nr_ore_totali_disp:richiesta.nrOre,
      ts_ult_modifica:richiesta.tsUltimaModifica,
      ts_creazione:richiesta.tsCreazione,
      cd_stato_pag_beneficiario:richiesta.cdStatoBen,
      cd_stato_pag_mansioni:richiesta.cdStatoMans,
      cd_stato_pag_casa:richiesta.cdStatoCasa,
      cd_stato_pag_animali:richiesta.cdStatoAnimali,
      cd_stato_pag_disponibilita:richiesta.cdStatoDisponibilita,
      cd_stato_pag_preferenzelav:richiesta.cdStatoPreferenzeLav,
      cd_stato_pag_sedelavoro:richiesta.cdStatoSedeLavoro,
      js_impersonificazione:richiesta.jsImp,
      nr_ore_richieste_totali:richiesta.nrOreRichieste
    }));
  return await knex(richiesta_servizio_tcb).insert(fixtureMapped);

};