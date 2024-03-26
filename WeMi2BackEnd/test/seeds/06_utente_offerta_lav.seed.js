import tabelle from 'tabelle';
import { fixtureUtenteOffertaLav } from '../fixtures/utente_offerta_lav.fixture';

exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  const { utente_offerta_lav } = tabelle;
  await knex(utente_offerta_lav).delete();
  // Inserts seed entries
  const fixtureMapped = fixtureUtenteOffertaLav.map(utente =>({
     id_utente_lav:utente.idUtenteLav,
     fg_idoneita:utente.fgIdoneita,
     dt_disponibile_dal:utente.dtDisponibileDal,
     dt_iscrizione:utente.dtIscrizione,
     tx_nota_operatore:utente.txNota,
     cd_ultimo_stato_offerta:utente.cdOfferta,
     id_ult_operatore:utente.idUltOperatore,
     ts_ultima_modifica:utente.tsUltModifica,
     ts_creazione:utente.tsCreazione,
     cd_stato_pag_anagrafica:utente.cdStatoPagAnag,
     cd_stato_pag_stato_occup:utente.cdStatoStatOccup,
     cd_stato_pag_istruzione:utente.cdStatoPagIstr,
     cd_stato_pag_esp_lav:utente.cdStatoPagEspLav,
     cd_stato_pag_dati_pers:utente.cdStatoPagDatiPers,
     cd_stato_pag_comp_tata:utente.cdStatoPagCompTata,
     cd_stato_pag_esp_tata:utente.cdStatoPagEspTata,
     cd_stato_pag_disp_tata:utente.cdStatoPagDispTata,
     cd_stato_pag_comp_colf:utente.cdStatoPagCompColf,
     cd_stato_pag_esp_colf:utente.cdStatoPagEspColf,
     cd_stato_pag_disp_colf:utente.cdStatoPagDispColf,
     cd_stato_pag_comp_badante:utente.cdStatoPagCompBad,
     cd_stato_pag_esp_badante:utente.cdStatoPagEspBad,
     cd_stato_pag_disp_badante:utente.cdStatoPagDispBad,
     cd_stato_pag_candidatura:utente.cdStatoPagCandidatura,
     fg_candidatura_tata:utente.fgTata,
     fg_candidatura_colf:utente.fgColf,
     fg_candidatura_badante:utente.fgBadante
    }));
  return await knex(utente_offerta_lav).insert(fixtureMapped);

};