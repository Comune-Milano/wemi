import { ApolloError } from 'apollo-server';
import { isNullOrUndefined } from "util";
import { REQUEST_TCB_INSERT_FAIL, RESOURCE_NOT_FOUND, SEND_EMAIL_ERROR } from '../../errors/errors';
import { STEP_NOT_SAVED_ERROR, DELETE_ATTACHMENT_ERROR } from "../../errors/errors";
import { findMaxVariazioneStato } from 'sql/richiestaentestt/selezione';
import { findUserByIdRequest, findInfoRequestTCB } from '../../sql/richiestatcb/selezione';
import { insertStateRequestBase, insertStateRequestEnte, inserisciRichiestaTcb, insertStateRequestBaseRichiestaAnnullamento } from '../../sql/richiestatcb/inserimento';
import { TEMPLATE_ANN_RIC_ENTE, TEMPLATE_ANN_RIC_ENTE_ADMIN, TEMPLATE_INOLTRA_RICHIESTA_TCB, TEMPLATE_RICHIESTA_ANNULLAMENTO_DOMANDA_TCB } from '../../constants/templates/database_template';
import { estraiDati008 } from 'sql/valattributodomanda/estraiDati008';
import { selectForEstraiDati002 } from 'sql/beneficiarioricservtcb/selectForEstraiDati002';
import { selectEtaBeneficiari } from 'sql/valattributobeneficiario/selectEtaBeneficiari';
import { selectForEstraiDatiConfig002 } from 'sql/valattributobeneficiario/selectForEstraiDatiConfig002';
import { selectValAttributoEstraiDati002 } from 'sql/valattributodomanda/selectValAttributoEstraiDati002';
import { selectForEstraiDatiReferenzaLavoratore } from 'sql/valattributodomanda/selectForEstraiDatiReferenzaLavoratore';
import { selectForEstraiAttributiDomandaTcb } from 'sql/valattributodomanda/selectForEstraiAttributiDomandaTcb';
import { selectForEstraiDati003withJoin } from 'sql/valattributodomanda/selectForEstraiDati003withJoin';
import { selectForEstraiDati003 } from 'sql/valattributodomanda/selectForEstraiDati003';
import { selectForEstraiDatiRichiestaDisponibilita } from 'sql/valattributodomanda/selectForEstraiDatiRichiestaDisponibilita';
import { selectDisponibilitaDays } from 'sql/richiestatcb/selectDisponibilitaDays';
import { updateForAggiornaDatiStepTcb } from 'sql/richiestatcb/updateForAggiornaDatiStepTcb';
import { insertForRichiestaTcb } from 'sql/richiestabase/insertForRichiestaTcb';
import { InsertSttForRichiestaTcb } from 'sql/richiestabasestt/insertSttForRichiestaTcb';
import { selectNextValRichiestaEnte } from 'sql/richiestaente/selectNextValRichiestaEnte';
import { insertRichiestaEnteTcb } from 'sql/richiestaente/insertRichiestaEnteTcb';
import { insertSttRichiestaEnteTcb } from 'sql/richiestaentestt/insertSttRichiestaEnteTcb';
import { insertRecensioneForRichiestaTcb } from 'sql/recensioneente/insertRecensioneForRichiestaTcb';
import { insertValForRichiestaTcb } from 'sql/valattributodomanda/insertValForRichiestaTcb';
import { insertRecensioneStt } from "sql/recensionentestt/insertRecensioneStt";
import { estraiEmailDomandaTCB } from "sql/estraiEmailDomandaTCB/estraiEmailDomandaTCB";
import { selectByIdRichiestaEnte } from 'sql/richiestaente/selectByIdRichiestaEnte';
import { insertSttForInviaRichiestaTcb } from 'sql/richiestaentestt/insertSttForInviaRichiestaTcb';
import { selectJsImpersonificazione } from 'sql/richiestatcb/selectJsImpersonificazione';
import { insertSttForJsImpersonificazione } from 'sql/richiestaentestt/insertSttForJsImpersonificazione';
import { attributo } from "../../constants/db/attributo";
import { queryEstraiImportoDomandaTCB } from 'sql/valattributodomanda/queryEstraiImportoDomandaTCB';
import { returnCdAttributoBeneficiario } from 'utility/beneficiarioTataBadante';
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
import { PAGE_REQUESTSINDEX_URL } from 'constants/router/url';

/** @format */
export default {
  Query: {
    EstraiStatoDomandaTCB: async (parent, args, context, info) => {
      const sql = `
               SELECT cd_stato_ric_serv_ente 
	             FROM wemi2.richiesta_servizio_ente_stt
	             WHERE id_richiesta_servizio_ente = $[idDomandaTCB] AND ts_variazione_stato= (
                 SELECT MAX(ts_variazione_stato)
                 FROM wemi2.richiesta_servizio_ente_stt
                 WHERE id_richiesta_servizio_ente = $[idDomandaTCB]
               );
      `;
      return await context.db.oneOrNone(sql, args);
    },
    EstraiUtenteDomandaTCB: async (parent, args, context, info) => {
      const sql = `
          SELECT utente.id_utente, utente.tx_nome_utente, utente.tx_cognome_utente, utente.cd_sesso_utente, utente.js_anagrafica_residenza, utente.ptx_codice_fiscale
          FROM wemi2.richiesta_servizio_ente
          JOIN wemi2.richiesta_servizio_base ON richiesta_servizio_base.id_richiesta_servizio_base = richiesta_servizio_ente.id_richiesta_servizio_base
          JOIN wemi2.utente ON utente.id_utente = richiesta_servizio_base.id_utente_richiedente
          WHERE id_richiesta_servizio_ente= $[idDomandaTCB];
        `;
      return await context.db.oneOrNone(sql, args);
    },

    EstraiDatiConfigurazioneRichiesta008: async (parent, args, context, info) => {
      let arrayConfig = args.datiRichiesta.arrayConfig;
      let idRichiestaTcb = args.datiRichiesta.idRichiestaTcb;
      context.logger.info(estraiDati008, { ...args, arrayConfig, idRichiestaTcb });
      return await context.db.any(estraiDati008, { ...args, arrayConfig, idRichiestaTcb }).catch(error => { throw new Error(error) });

    },
    EstraiDatiConfigurazioneRichiesta001: async (parent, args, context, info) => {
      let config001;

      const sql = `
            SELECT 
            val.id_richiesta_servizio_tcb AS "idRichiestaTcb", 
            serv.id_servizio_erogato_ente AS "idServizio",
            val.cd_attributo AS "cdAttributo",
             dom.tl_valore_testuale AS "tlValoreTestuale", 
             val.tx_val AS "txVal",
             rtcb.qt_beneficiari AS "numeroPersone",
             attr.ty_dominio_tcb AS "dominioTcb", 
             val.cd_val_attributo AS "cdValAttributo", 
             fg_val AS flag, 
             val.ts_modifica AS "tsModifica", 
             rtcb.ts_creazione AS "tsCreazione"
            	FROM ${context.tabelle.val_attributo_domanda} val
                LEFT JOIN ${context.tabelle.attributo} attr on (attr.cd_attributo = val.cd_attributo)
                LEFT JOIN ${context.tabelle.richiesta_servizio_ente} serv on (serv.id_richiesta_servizio_ente = val.id_richiesta_servizio_tcb)
                LEFT JOIN ${context.tabelle.richiesta_servizio_tcb} rtcb on (rtcb.id_richiesta_servizio_tcb = val.id_richiesta_servizio_tcb)
            	LEFT JOIN ${context.tabelle.dominio_tcb} dom on (attr.ty_dominio_tcb = dom.ty_dominio_tcb and val.cd_val_attributo = dom.cd_dominio_tcb)
            	WHERE val.id_richiesta_servizio_tcb = $[idRichiestaTcb]`;
      await context.db.any(sql, args).then(res => config001 = res);
      if (config001 && config001[0])
        return {
          idRichiestaTcb: config001[0].idRichiestaTcb,
          idServizio: config001[0].idServizio,
          numeroPersone: config001[0].numeroPersone,
          orario: config001.filter(el => { return el.cdAttributo === '14' })[0] && {
            cdAttributo: config001.filter(el => { return el.cdAttributo === '14' })[0].cdAttributo,
            tlValoreTestuale: config001.filter(el => { return el.cdAttributo === '14' })[0].tlValoreTestuale,
            dominioTcb: config001.filter(el => { return el.cdAttributo === '14' })[0].dominioTcb,
            cdValAttributo: config001.filter(el => { return el.cdAttributo === '14' })[0].cdValAttributo,
            tsModifica: config001.filter(el => { return el.cdAttributo === '14' })[0].tsModifica,
            tsCreazione: config001.filter(el => { return el.cdAttributo === '14' })[0].tsCreazione,
          },
          benFlag: config001.filter(el => { return el.cdAttributo === '35' })[0] && {
            cdAttributo: config001.filter(el => { return el.cdAttributo === '35' })[0].cdAttributo,
            dominioTcb: config001.filter(el => { return el.cdAttributo === '35' })[0].dominioTcb,
            cdValAttributo: config001.filter(el => { return el.cdAttributo === '35' })[0].cdValAttributo,
            flag: config001.filter(el => { return el.cdAttributo === '35' })[0].flag,
            tsModifica: config001.filter(el => { return el.cdAttributo === '35' })[0].tsModifica,
            tsCreazione: config001.filter(el => { return el.cdAttributo === '35' })[0].tsCreazione,
          },
          casaFlag: config001.filter(el => { return el.cdAttributo === '54' })[0] && {
            cdAttributo: config001.filter(el => { return el.cdAttributo === '54' })[0].cdAttributo,
            dominioTcb: config001.filter(el => { return el.cdAttributo === '54' })[0].dominioTcb,
            cdValAttributo: config001.filter(el => { return el.cdAttributo === '54' })[0].cdValAttributo,
            flag: config001.filter(el => { return el.cdAttributo === '54' })[0].flag,
            tsModifica: config001.filter(el => { return el.cdAttributo === '54' })[0].tsModifica,
            tsCreazione: config001.filter(el => { return el.cdAttributo === '54' })[0].tsCreazione,
          },

        }
      else return {
        idRichiestaTcb: -1,
        idServizio: -1,
      }
    },

    EstraiEtaBeneficiari: (parent, args, context, info) => { 

     return context.db.any(selectEtaBeneficiari, args);
    },

    EstraiDatiConfigurazioneRichiesta002: async (parent, args, context, info) => {
      let sql, pgBenList = [], config002, datiRichiestaGenerali, arrayBen;

      const cdAttributoBeneficiario = returnCdAttributoBeneficiario(args.idServizio);
      
      await context.db.tx('datiRichiesta002', async t => {

        await t.any(selectForEstraiDati002, args).then((result) => pgBenList = result)
        if (pgBenList.length > 0) {

          await t.any(selectForEstraiDatiConfig002, args).then(res => config002 = res)
        }
        await t.any(selectValAttributoEstraiDati002, args).then(res => datiRichiestaGenerali = res)
          , context.logger.info(datiRichiestaGenerali)
      });
      context.logger.info(args.idServizio)
      return {
        altriFratelliFlag: datiRichiestaGenerali && datiRichiestaGenerali.filter(el => { return el.cdAttributo === '46' })[0] && {
          cdAttributo: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '46' })[0].cdAttributo,
          cdValAttributo: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '46' })[0].cdValAttributo,
          flag: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '46' })[0].flag,
          tsModifica: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '46' })[0].tsModifica,
          tsCreazione: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '46' })[0].tsCreazione,
        },
        altriFlag: datiRichiestaGenerali && datiRichiestaGenerali.filter(el => { return el.cdAttributo === '47' })[0] && {
          cdAttributo: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '47' })[0].cdAttributo,
          cdValAttributo: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '47' })[0].cdValAttributo,
          flag: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '47' })[0].flag,
          txNota: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '47' })[0].txNota,
          tsModifica: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '47' })[0].tsModifica,
          tsCreazione: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '47' })[0].tsCreazione,
        },
        nonniFlag: datiRichiestaGenerali && datiRichiestaGenerali.filter(el => { return el.cdAttributo === '51' })[0] && {
          cdAttributo: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '51' })[0].cdAttributo,
          cdValAttributo: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '51' })[0].cdValAttributo,
          flag: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '51' })[0].flag,
          tsModifica: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '51' })[0].tsModifica,
          tsCreazione: datiRichiestaGenerali.filter(el => { return el.cdAttributo === '51' })[0].tsCreazione,
        },
        beneficiari: pgBenList.length > 0 ? pgBenList.map((elPg, index) => {
          return {
            pgBen: elPg.pg_beneficiario_richiesta_tcb,
            relazione: config002.filter(el => { return el.cdAttributo === cdAttributoBeneficiario && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === cdAttributoBeneficiario && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              tlValoreTestuale: config002.filter(el => { return el.cdAttributo === cdAttributoBeneficiario && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tlValoreTestuale,
              dominioTcb: config002.filter(el => { return el.cdAttributo === cdAttributoBeneficiario && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].dominioTcb,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === cdAttributoBeneficiario && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === cdAttributoBeneficiario && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === cdAttributoBeneficiario && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            altroRelazione: config002.filter(el => { return el.cdAttributo === cdAttributoBeneficiario && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] &&
              config002.filter(el => { return el.cdAttributo === cdAttributoBeneficiario && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].txNota,
            nomeBen: config002.filter(el => { return el.cdAttributo === '89' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === '89' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              txVal: config002.filter(el => { return el.cdAttributo === '89' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].txVal,
              dominioTcb: config002.filter(el => { return el.cdAttributo === '89' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].dominioTcb,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === '89' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === '89' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === '89' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            cognomeBen: config002.filter(el => { return el.cdAttributo === '80' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === '80' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              txVal: config002.filter(el => { return el.cdAttributo === '80' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].txVal,
              dominioTcb: config002.filter(el => { return el.cdAttributo === '80' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].dominioTcb,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === '80' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === '80' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === '80' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            sesso: config002.filter(el => { return el.cdAttributo === '19' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === '19' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              tlValoreTestuale: config002.filter(el => { return el.cdAttributo === '19' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tlValoreTestuale,
              dominioTcb: config002.filter(el => { return el.cdAttributo === '19' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].dominioTcb,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === '19' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === '19' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === '19' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            eta: config002.filter(el => { return el.cdAttributo === '71' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === '71' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              nrVal: config002.filter(el => { return el.cdAttributo === '71' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].nrVal,
              dominioTcb: config002.filter(el => { return el.cdAttributo === '71' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].dominioTcb,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === '71' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === '71' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === '71' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            fasciaEta: config002.filter(el => { return el.cdAttributo === '8' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === '8' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              tlValoreTestuale: config002.filter(el => { return el.cdAttributo === '8' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tlValoreTestuale,
              dominioTcb: config002.filter(el => { return el.cdAttributo === '8' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].dominioTcb,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === '8' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === '8' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === '8' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            patologieBambino: config002.filter(el => { return el.cdAttributo === '66' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb }).map(el => {
              return {
                cdAttributo: el.cdAttributo,
                tlValoreTestuale: el.tlValoreTestuale,
                dominioTcb: el.dominioTcb,
                cdValAttributo: el.cdValAttributo,
                txNota: el.txNota,
                tsModifica: el.tsModifica,
                tsCreazione: el.tsCreazione,
              }
            }),
            patologieAnziano: config002.filter(el => { return el.cdAttributo === '65' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb }).map(el => {
              return {
                cdAttributo: el.cdAttributo,
                tlValoreTestuale: el.tlValoreTestuale,
                dominioTcb: el.dominioTcb,
                cdValAttributo: el.cdValAttributo,
                txNota: el.txNota,
                tsModifica: el.tsModifica,
                tsCreazione: el.tsCreazione,
              }
            }),
            altreInfoPatologie: config002.filter(el => { return el.cdAttributo === '78' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === '78' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              txVal: config002.filter(el => { return el.cdAttributo === '78' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].txVal,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === '78' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === '78' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === '78' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            deambulazione: config002.filter(el => { return el.cdAttributo === '7' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === '7' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              tlValoreTestuale: config002.filter(el => { return el.cdAttributo === '7' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tlValoreTestuale,
              dominioTcb: config002.filter(el => { return el.cdAttributo === '7' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].dominioTcb,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === '7' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === '7' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === '7' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            altroDeambulazione: config002.filter(el => { return el.cdAttributo === '7' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] &&
              config002.filter(el => { return el.cdAttributo === '7' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].txNota,
            altezza: config002.filter(el => { return el.cdAttributo === '5' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === '5' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              tlValoreTestuale: config002.filter(el => { return el.cdAttributo === '5' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tlValoreTestuale,
              dominioTcb: config002.filter(el => { return el.cdAttributo === '5' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].dominioTcb,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === '5' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === '5' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === '5' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            corporatura: config002.filter(el => { return el.cdAttributo === '6' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === '6' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              tlValoreTestuale: config002.filter(el => { return el.cdAttributo === '6' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tlValoreTestuale,
              dominioTcb: config002.filter(el => { return el.cdAttributo === '6' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].dominioTcb,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === '6' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === '6' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === '6' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            altreInfo: config002.filter(el => { return el.cdAttributo === '77' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0] && {
              cdAttributo: config002.filter(el => { return el.cdAttributo === '77' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdAttributo,
              txVal: config002.filter(el => { return el.cdAttributo === '77' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].txVal,
              cdValAttributo: config002.filter(el => { return el.cdAttributo === '77' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].cdValAttributo,
              tsModifica: config002.filter(el => { return el.cdAttributo === '77' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsModifica,
              tsCreazione: config002.filter(el => { return el.cdAttributo === '77' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb })[0].tsCreazione,
            },
            lingue: config002.filter(el => { return el.cdAttributo === '58' && parseInt(el.pgBen) === elPg.pg_beneficiario_richiesta_tcb }).map(el => {
              return {
                cdAttributo: el.cdAttributo,
                tlValoreTestuale: el.tlValoreTestuale,
                dominioTcb: el.dominioTcb,
                cdValAttributo: el.cdValAttributo,
                txNota: el.txNota,
                tsModifica: el.tsModifica,
                tsCreazione: el.tsCreazione,
              }
            }),
          }
        }) : [],
      }
    },

    EstraiFormFieldValues002: async (parent, args, context, info) => {
      let formData;
      const sql = `    SELECT ty_dominio_tcb as "tyDominioTcb", 
                cd_dominio_tcb as "cdDominioTcb", 
                pg_visualizzazione as "pgVisualizzazzione", 
                tl_valore_testuale as "tlValoreTestuale", 
                nr_valore_min_rif as "minRif", 
                nr_valore_max_rif as "maxRif"
                FROM  ${context.tabelle.dominio_tcb}
                WHERE 
                ty_dominio_tcb = 26 OR
                ty_dominio_tcb = 55 OR
                ty_dominio_tcb = 9 OR
                ${args.idServizio === 1 ?
          `
                    ty_dominio_tcb = 6 OR
                    ty_dominio_tcb = 34 OR
                ` : ''}
                ${args.idServizio === 3 ?
          `
                        ty_dominio_tcb = 7 OR
                        ty_dominio_tcb = 8 OR
                        ty_dominio_tcb = 20 OR
                        ty_dominio_tcb = 18 OR
                ` : ''}
                ty_dominio_tcb = 24 and fg_domanda = '1'
                ORDER BY ty_dominio_tcb, pg_visualizzazione
                `;
      await context.db.any(sql).then(res => formData = res);
      return {
        relazioneFieldValues: formData.filter(el => el.tyDominioTcb === '26'),
        relazioneFieldValuesTata: formData.filter (el => el.tyDominioTcb === '55'),
        sessoFieldValues: formData.filter(el => el.tyDominioTcb === '9'),
        fasciaEtaFieldValues: formData.filter(el => el.tyDominioTcb === '6'),
        corporaturaFieldValues: formData.filter(el => el.tyDominioTcb === '8'),
        altezzaFieldValues: formData.filter(el => el.tyDominioTcb === '7'),
        patologieFieldValues: formData.filter(el => args.idServizio === 1 ? el.tyDominioTcb === '34' : el.tyDominioTcb === '20'),
        lingueParlateFieldValues: formData.filter(el => el.tyDominioTcb === '24'),
        deambulazioneFieldValues: formData.filter(el => el.tyDominioTcb === '18'),
      }
    },

    EstraiDatiReferenzaLavoratore: async (parent, args, context, info) => {
      const { idRichiestaTcb, arrayConfig } = args;


      return await context.db.any(selectForEstraiDatiReferenzaLavoratore, { idRichiestaTcb, arrayConfig });
    },

    EstraiAttributiDomandaTCB: async (parent, args, context, info) => {
      const { idRichiestaTcb, arrayConfig } = args;


      return await context.db.any(selectForEstraiAttributiDomandaTcb, { idRichiestaTcb, arrayConfig });
    },

    EstraiImportoDomandaTCB: async (parent, args, context, info) => {  
     return await context.db.oneOrNone(queryEstraiImportoDomandaTCB,args);
    },

    EstraiDatiConfigurazioneRichiestaDisponibilita: async (parent, args, context, info) => {
      let sql;
      let arrayConfig = args.datiDisponibilita.arrayConfig;
      let json = {};
      let calendario = {};
      json.disponibilita = [];
      await context.db.task('TransazioneDisponibilita', async t => {
        let dato = await t.any(selectForEstraiDatiRichiestaDisponibilita, args);
        for (let i = 0; i < arrayConfig.length; i += 1) {
          for (let j = 0; j < dato.length; j += 1) {
            if (arrayConfig[i] === parseInt(dato[j].cd_attributo)) {
              json.disponibilita.push(dato[j]);
            }
          }

          let risultato = dato;
          let arrayRisultato = [];
          if (arrayConfig[i] >= 1 && arrayConfig[i] <= 4) {
            calendario = await t.oneOrNone(selectDisponibilitaDays, args);
          }
        }
      });

      const countHours = (bin) => {
        return bin.split("1").length - 1
      };

      if (calendario) {
        json.calendarioTCB = [
          {
            txValue: "Lunedì",
            hoursBin: calendario.tx_lunedi_cal_disp ? calendario.tx_lunedi_cal_disp : null,
            count: calendario.tx_lunedi_cal_disp ? countHours(calendario.tx_lunedi_cal_disp) : 0,
            intervals: Array(1)
          },
          {
            txValue: "Martedì",
            hoursBin: calendario.tx_martedi_acl_disp ? calendario.tx_martedi_acl_disp : null,
            count: calendario.tx_martedi_acl_disp ? countHours(calendario.tx_martedi_acl_disp) : 0,
            intervals: Array(1)
          },
          {
            txValue: "Mercoledì",
            hoursBin: calendario.tx_mercoledi_cal_disp ? calendario.tx_mercoledi_cal_disp : null,
            count: calendario.tx_mercoledi_cal_disp ? countHours(calendario.tx_mercoledi_cal_disp) : 0,
            intervals: Array(1)
          },
          {
            txValue: "Giovedì",
            hoursBin: calendario.tx_giovedi_cal_disp ? calendario.tx_giovedi_cal_disp : null,
            count: calendario.tx_giovedi_cal_disp ? countHours(calendario.tx_giovedi_cal_disp) : 0,
            intervals: Array(1)
          },
          {
            txValue: "Venerdì",
            hoursBin: calendario.tx_venerdi_cal_disp ? calendario.tx_venerdi_cal_disp : null,
            count: calendario.tx_venerdi_cal_disp ? countHours(calendario.tx_venerdi_cal_disp) : 0,
            intervals: Array(1)
          },
          {
            txValue: "Sabato",
            hoursBin: calendario.tx_sabato_cal_disp ? calendario.tx_sabato_cal_disp : null,
            count: calendario.tx_sabato_cal_disp ? countHours(calendario.tx_sabato_cal_disp) : 0,
            intervals: Array(1)
          },
          {
            txValue: "Domenica",
            hoursBin: calendario.tx_domenica_cal_disp ? calendario.tx_domenica_cal_disp : null,
            count: calendario.tx_domenica_cal_disp ? countHours(calendario.tx_domenica_cal_disp) : 0,
            intervals: Array(1)
          },
          {
            nr_ore_totali: calendario.nr_ore_richieste_totali ? calendario.nr_ore_richieste_totali : 0
          }
        ];
      } else json.calendarioTCB = [];

      json.idRichiestaTcb = args.datiDisponibilita.idRichiestaTcb;
      return json;
    },

    EstraiDatiConfigurazioneRichiesta004: async (parent, args, context, info) => {
      let config004;
      const sql = `
            SELECT 
            val.tx_val as "txVal",
            val.id_richiesta_servizio_tcb AS "idRichiestaTcb", 
            val.cd_attributo AS "cdAttributo",
             dom.tl_valore_testuale AS "tlValoreTestuale", 
             val.tx_nota AS "txNota",
             val.nr_val AS "nrVal",
             rtcb.qt_beneficiari AS "numeroPersone",
             attr.ty_dominio_tcb AS "dominioTcb", 
             val.cd_val_attributo AS "cdValAttributo", 
             fg_val AS flag, 
             val.ts_modifica AS "tsModifica", 
             rtcb.ts_creazione AS "tsCreazione"
            	FROM ${context.tabelle.val_attributo_domanda} val
                LEFT JOIN ${context.tabelle.attributo} attr on (attr.cd_attributo = val.cd_attributo)
                LEFT JOIN ${context.tabelle.richiesta_servizio_tcb} rtcb on (rtcb.id_richiesta_servizio_tcb = val.id_richiesta_servizio_tcb)
                LEFT JOIN ${context.tabelle.dominio_tcb} dom on (attr.ty_dominio_tcb = dom.ty_dominio_tcb and val.cd_val_attributo = dom.cd_dominio_tcb)
            	WHERE val.id_richiesta_servizio_tcb = $[idRichiestaTcb]`;
      await context.db.any(sql, args).then(res => config004 = res);
      if (config004 && config004[0])
        return {
          idRichiestaTcb: config004[0].idRichiestaTcb,
          mansioni: config004.filter(el => { return el.cdAttributo === '61' }).map(mans => {
            return {
              tyDominioTcb: mans.dominioTcb,
              txTitoloMansione: mans.tlValoreTestuale,
              cdDominioTcb: mans.cdValAttributo,
            }
          }),
          altroValue: config004.filter(el => { return el.cdAttributo === '61' }).filter(el => { return el.cdValAttributo === '0' })[0] &&
            config004.filter(el => { return el.cdAttributo === '61' }).filter(el => { return el.cdValAttributo === '0' })[0].txNota,
          superficieCasa: config004.filter(el => { return el.cdAttributo === '28' })[0] && {
            cdAttributo: config004.filter(el => { return el.cdAttributo === '28' })[0].cdAttributo,
            tlValoreTestuale: config004.filter(el => { return el.cdAttributo === '28' })[0].tlValoreTestuale,
            dominioTcb: config004.filter(el => { return el.cdAttributo === '28' })[0].dominioTcb,
            cdValAttributo: config004.filter(el => { return el.cdAttributo === '28' })[0].cdValAttributo,
            tsModifica: config004.filter(el => { return el.cdAttributo === '28' })[0].tsModifica,
            tsCreazione: config004.filter(el => { return el.cdAttributo === '28' })[0].tsCreazione,
          },
          numeroStanze: config004.filter(el => { return el.cdAttributo === '13' })[0] && {
            cdAttributo: config004.filter(el => { return el.cdAttributo === '13' })[0].cdAttributo,
            tlValoreTestuale: config004.filter(el => { return el.cdAttributo === '13' })[0].tlValoreTestuale,
            dominioTcb: config004.filter(el => { return el.cdAttributo === '13' })[0].dominioTcb,
            cdValAttributo: config004.filter(el => { return el.cdAttributo === '13' })[0].cdValAttributo,
            tsModifica: config004.filter(el => { return el.cdAttributo === '13' })[0].tsModifica,
            tsCreazione: config004.filter(el => { return el.cdAttributo === '13' })[0].tsCreazione,
          },
          numeroBagni: config004.filter(el => { return el.cdAttributo === '12' })[0] && {
            cdAttributo: config004.filter(el => { return el.cdAttributo === '12' })[0].cdAttributo,
            tlValoreTestuale: config004.filter(el => { return el.cdAttributo === '12' })[0].tlValoreTestuale,
            dominioTcb: config004.filter(el => { return el.cdAttributo === '12' })[0].dominioTcb,
            cdValAttributo: config004.filter(el => { return el.cdAttributo === '12' })[0].cdValAttributo,
            tsModifica: config004.filter(el => { return el.cdAttributo === '12' })[0].tsModifica,
            tsCreazione: config004.filter(el => { return el.cdAttributo === '12' })[0].tsCreazione,
          },
          abitazione: config004.filter(el => { return el.cdAttributo === '10' })[0] && {
            cdAttributo: config004.filter(el => { return el.cdAttributo === '10' })[0].cdAttributo,
            tlValoreTestuale: config004.filter(el => { return el.cdAttributo === '10' })[0].tlValoreTestuale,
            dominioTcb: config004.filter(el => { return el.cdAttributo === '10' })[0].dominioTcb,
            cdValAttributo: config004.filter(el => { return el.cdAttributo === '10' })[0].cdValAttributo,
            tsModifica: config004.filter(el => { return el.cdAttributo === '10' })[0].tsModifica,
            tsCreazione: config004.filter(el => { return el.cdAttributo === '10' })[0].tsCreazione,
          },
          giardinoFlag: config004.filter(el => { return el.cdAttributo === '50' })[0] && {
            cdAttributo: config004.filter(el => { return el.cdAttributo === '50' })[0].cdAttributo,
            dominioTcb: config004.filter(el => { return el.cdAttributo === '50' })[0].dominioTcb,
            cdValAttributo: config004.filter(el => { return el.cdAttributo === '50' })[0].cdValAttributo,
            flag: config004.filter(el => { return el.cdAttributo === '50' })[0].flag,
            nrVal: config004.filter(el => { return el.cdAttributo === '50' })[0].nrVal,
            tsModifica: config004.filter(el => { return el.cdAttributo === '50' })[0].tsModifica,
            tsCreazione: config004.filter(el => { return el.cdAttributo === '50' })[0].tsCreazione,
          },
          terrazzaFlag: config004.filter(el => { return el.cdAttributo === '52' })[0] && {
            cdAttributo: config004.filter(el => { return el.cdAttributo === '52' })[0].cdAttributo,
            dominioTcb: config004.filter(el => { return el.cdAttributo === '52' })[0].dominioTcb,
            cdValAttributo: config004.filter(el => { return el.cdAttributo === '52' })[0].cdValAttributo,
            flag: config004.filter(el => { return el.cdAttributo === '52' })[0].flag,
            tsModifica: config004.filter(el => { return el.cdAttributo === '52' })[0].tsModifica,
            tsCreazione: config004.filter(el => { return el.cdAttributo === '52' })[0].tsCreazione,
          },
          ascensoreFlag: config004.filter(el => { return el.cdAttributo === '49' })[0] && {
            cdAttributo: config004.filter(el => { return el.cdAttributo === '49' })[0].cdAttributo,
            dominioTcb: config004.filter(el => { return el.cdAttributo === '49' })[0].dominioTcb,
            cdValAttributo: config004.filter(el => { return el.cdAttributo === '49' })[0].cdValAttributo,
            flag: config004.filter(el => { return el.cdAttributo === '49' })[0].flag,
            tsModifica: config004.filter(el => { return el.cdAttributo === '49' })[0].tsModifica,
            tsCreazione: config004.filter(el => { return el.cdAttributo === '49' })[0].tsCreazione,
          },
          fumatoriFlag: config004.filter(el => { return el.cdAttributo === '44' })[0] && {
            cdAttributo: config004.filter(el => { return el.cdAttributo === '44' })[0].cdAttributo,
            dominioTcb: config004.filter(el => { return el.cdAttributo === '44' })[0].dominioTcb,
            cdValAttributo: config004.filter(el => { return el.cdAttributo === '44' })[0].cdValAttributo,
            flag: config004.filter(el => { return el.cdAttributo === '44' })[0].flag,
            tsModifica: config004.filter(el => { return el.cdAttributo === '44' })[0].tsModifica,
            tsCreazione: config004.filter(el => { return el.cdAttributo === '44' })[0].tsCreazione,
          },
          piano: config004.filter(el => { return el.cdAttributo === '92' })[0] && {
            cdAttributo: config004.filter(el => { return el.cdAttributo === '92' })[0].cdAttributo,
            txVal: config004.filter(el => { return el.cdAttributo === '92' })[0].txVal,
            cdValAttributo: config004.filter(el => { return el.cdAttributo === '92' })[0].cdValAttributo,
            tsModifica: config004.filter(el => { return el.cdAttributo === '92' })[0].tsModifica,
            tsCreazione: config004.filter(el => { return el.cdAttributo === '92' })[0].tsCreazione,
          },
          flagCasa: config004.filter(el => { return el.cdAttributo === '54' })[0] && {
            cdAttributo: config004.filter(el => { return el.cdAttributo === '54' })[0].cdAttributo,
            dominioTcb: config004.filter(el => { return el.cdAttributo === '54' })[0].dominioTcb,
            cdValAttributo: config004.filter(el => { return el.cdAttributo === '54' })[0].cdValAttributo,
            flag: config004.filter(el => { return el.cdAttributo === '54' })[0].flag,
            tsModifica: config004.filter(el => { return el.cdAttributo === '54' })[0].tsModifica,
            tsCreazione: config004.filter(el => { return el.cdAttributo === '54' })[0].tsCreazione,
          },

        }
      else return {
        idRichiestaTcb: -1,
      }
    },

    EstraiDatiConfigurazioneRichiesta005: async (parent, args, context, info) => {
      let config005;
      const sql = `
            SELECT 
                val.tx_nota as "txNota",
                val.id_richiesta_servizio_tcb AS "idRichiestaTcb", 
                val.cd_attributo AS "cdAttributo",
                dom.tl_valore_testuale AS "tlValoreTestuale", 
                val.tx_val AS "txVal",
                attr.ty_dominio_tcb AS "dominioTcb", 
                val.nr_val AS "nrVal",
                val.cd_val_attributo AS "cdValAttributo", 
                fg_val AS flag, 
                val.ts_modifica AS "tsModifica", 
                rtcb.ts_creazione AS "tsCreazione"
            FROM ${context.tabelle.val_attributo_domanda} val
            LEFT JOIN ${context.tabelle.attributo} attr on (attr.cd_attributo = val.cd_attributo)
            LEFT JOIN ${context.tabelle.richiesta_servizio_tcb} rtcb on (rtcb.id_richiesta_servizio_tcb = val.id_richiesta_servizio_tcb)
            LEFT JOIN ${context.tabelle.dominio_tcb} dom on (attr.ty_dominio_tcb = dom.ty_dominio_tcb and val.cd_val_attributo = dom.cd_dominio_tcb)        
            WHERE val.id_richiesta_servizio_tcb = $[idRichiestaTcb]`;
      await context.db.any(sql, args).then(res => config005 = res);
      if (config005 && config005[0])
        return {
          idRichiestaTcb: args.idRichiestaTcb,
          mansioni: config005.filter(el => { return el.cdAttributo === '59' }).map(mans => {
            return {
              cdDominioTcb: mans.cdValAttributo,
              txTitoloMansione: mans.tlValoreTestuale,
              tyDominioTcb: mans.dominioTcb,
              txNota: mans.txNota
            }
          }),
          dettaglioAnimali: config005.filter(el => { return el.cdAttributo === '83' })[0] && {
            cdAttributo: config005.filter(el => { return el.cdAttributo === '83' })[0].cdAttributo,
            dominioTcb: config005.filter(el => { return el.cdAttributo === '83' })[0].dominioTcb,
            cdValAttributo: config005.filter(el => { return el.cdAttributo === '83' })[0].cdValAttributo,
            txVal: config005.filter(el => { return el.cdAttributo === '83' })[0].txVal,
            tsModifica: config005.filter(el => { return el.cdAttributo === '83' })[0].tsModifica,
            tsCreazione: config005.filter(el => { return el.cdAttributo === '83' })[0].tsCreazione
          },
          animaliFlag: config005.filter(el => { return el.cdAttributo === '48' })[0] && {
            cdAttributo: config005.filter(el => { return el.cdAttributo === '48' })[0].cdAttributo,
            dominioTcb: config005.filter(el => { return el.cdAttributo === '48' })[0].dominioTcb,
            cdValAttributo: config005.filter(el => { return el.cdAttributo === '48' })[0].cdValAttributo,
            flag: config005.filter(el => { return el.cdAttributo === '48' })[0].flag,
            tsModifica: config005.filter(el => { return el.cdAttributo === '48' })[0].tsModifica,
            tsCreazione: config005.filter(el => { return el.cdAttributo === '48' })[0].tsCreazione
          },
          altriAnimaliFlag: config005.filter(el => { return el.cdAttributo === '45' })[0] && {
            cdAttributo: config005.filter(el => { return el.cdAttributo === '45' })[0].cdAttributo,
            dominioTcb: config005.filter(el => { return el.cdAttributo === '45' })[0].dominioTcb,
            cdValAttributo: config005.filter(el => { return el.cdAttributo === '45' })[0].cdValAttributo,
            flag: config005.filter(el => { return el.cdAttributo === '45' })[0].flag,
            tsModifica: config005.filter(el => { return el.cdAttributo === '45' })[0].tsModifica,
            tsCreazione: config005.filter(el => { return el.cdAttributo === '45' })[0].tsCreazione,
            txNota: config005.filter(el => { return el.cdAttributo === '45' })[0].txNota,
          },
          numeroCani: config005.filter(el => { return el.cdAttributo === '74' })[0] && {
            cdAttributo: config005.filter(el => { return el.cdAttributo === '74' })[0].cdAttributo,
            dominioTcb: config005.filter(el => { return el.cdAttributo === '74' })[0].dominioTcb,
            cdValAttributo: config005.filter(el => { return el.cdAttributo === '74' })[0].cdValAttributo,
            nrVal: config005.filter(el => { return el.cdAttributo === '74' })[0].nrVal,
            tsModifica: config005.filter(el => { return el.cdAttributo === '74' })[0].tsModifica,
            tsCreazione: config005.filter(el => { return el.cdAttributo === '74' })[0].tsCreazione,
          },
          numeroGatti: config005.filter(el => { return el.cdAttributo === '75' })[0] && {
            cdAttributo: config005.filter(el => { return el.cdAttributo === '75' })[0].cdAttributo,
            dominioTcb: config005.filter(el => { return el.cdAttributo === '75' })[0].dominioTcb,
            cdValAttributo: config005.filter(el => { return el.cdAttributo === '75' })[0].cdValAttributo,
            nrVal: config005.filter(el => { return el.cdAttributo === '75' })[0].nrVal,
            tsModifica: config005.filter(el => { return el.cdAttributo === '75' })[0].tsModifica,
            tsCreazione: config005.filter(el => { return el.cdAttributo === '75' })[0].tsCreazione,
          },
        }

      else return {
        idRichiestaTcb: -1,
      }
    },

    EstraiDatiConfigurazioneRichiesta003: async (parent, args, context, info) => {
      let config003;
      context.logger.info(args.input.cdServizioTcb)

      if (args.input.cdServizioTcb === 3) {
        context.logger.info(selectForEstraiDati003, args.input);
        await context.db.any(selectForEstraiDati003, args.input).then(res => config003 = res);
        context.logger.info(config003)
        if (config003 && config003[0] && !isNullOrUndefined(config003[0].idRichiestaTcb))
          return {
            idRichiestaTcb: args.input.idRichiestaTcb,
            mansioni: config003.map(el => {
              return {
                tyDominioTcb: el.dominioTcb,
                cdDominioTcb: el.cdValAttributo,
                txTitoloMansione: el.tlValoreTestuale,
                txNota: el.txNota

              }
            })
          }
        else return {
          idRichiestaTcb: -1,
          mansioni: []
        }


      }
      else if (args.input.cdServizioTcb === 1) {

        context.logger.info(selectForEstraiDati003withJoin, args);
        await context.db.any(selectForEstraiDati003withJoin, args.input).then(res => config003 = res);
        if (config003 && config003[0] && !isNullOrUndefined(config003[0].cdValAttributo)) {
          return {
            idRichiestaTcb: config003[0].idRichiestaTcb,
            mansioni: () => {
              let mansArr = [];
              config003.map(uniqueMans => {
                let found = 0;
                if (mansArr.length > 0) {
                  mansArr.map(el => {
                    if (el.cdValAttributo === uniqueMans.cdValAttributo)
                      found = 1
                  })
                }
                if (found === 0)
                  mansArr.push(uniqueMans)
              });

              return mansArr.map(el => {
                return {
                  tyDominioTcb: el.dominioTcb,
                  cdDominioTcb: el.cdValAttributo,
                  txNota: el.txNota,
                  txTitoloMansione: el.tlValoreTestuale,
                  arrayBen: config003.filter(el2 => {
                    return (el.cdValAttributo === el2.cdValAttributo)
                  }).map(el3 => el3.pgBen)
                }
              })

            }

          }
        }
        else return {
          idRichiestaTcb: -1,
          mansioni: []
        }
      }
    },

    EstraiDatiStepTCB: async (parent, args, context, info) => {
      const { idRichiestaTcb } = args;
      try {
        const sql = `
            SELECT cd_stato_pag_beneficiario,
              cd_stato_pag_mansioni,
              cd_stato_pag_casa,
              cd_stato_pag_animali,
              cd_stato_pag_disponibilita, 
              cd_stato_pag_preferenzelav,
              cd_stato_pag_sedelavoro,
              id_utente_richiedente as "idUtenteRiferimento",
              CAST(cd_stato_ric_serv_ente AS Int) as "statoRichiesta"
            FROM ${context.tabelle.richiesta_servizio_tcb}
            INNER JOIN ${context.tabelle.richiesta_servizio_ente} ON id_richiesta_servizio_tcb = id_richiesta_servizio_ente
            INNER JOIN ${context.tabelle.richiesta_servizio_base} ON 
            richiesta_servizio_base.id_richiesta_servizio_base = richiesta_servizio_ente.id_richiesta_servizio_base
            INNER JOIN ${context.tabelle.richiesta_servizio_ente_stt} as ente_stt ON 
            richiesta_servizio_ente.id_richiesta_servizio_ente = ente_stt.id_richiesta_servizio_ente
            WHERE id_richiesta_servizio_tcb = $[idRichiestaTcb] 
            and ente_stt.ts_variazione_stato = 
                (SELECT MAX(ts_variazione_stato)
                FROM ${context.tabelle.richiesta_servizio_ente_stt}
                WHERE id_richiesta_servizio_ente = $[idRichiestaTcb])
        `;
        return await context.db.one(sql, { idRichiestaTcb });
      }
      catch (error) {
        throw new ApolloError(RESOURCE_NOT_FOUND.message, RESOURCE_NOT_FOUND.code);
      }
    },

    estraiRichiestaServizioTCB: async (parent, args, context, info) => {
      return await context.db.task(async task => {

        const { idRichiestaTcb: idRichiesta } = args;

        const { max: maxVariazioneStato } = await task.one(findMaxVariazioneStato, { idRichiesta });

        context.logger.info(findMaxVariazioneStato, args, info.fieldName, context.user);

        const requestTcb = await task.one(findInfoRequestTCB, { ...args, maxVariazioneStato });

        context.logger.info(findInfoRequestTCB, { ...args, maxVariazioneStato }, info.fieldName, context.user);

        return requestTcb;
      });
    },

    EstraiAttributoTCBRichiesta: async (parent, args, context, info) => {
      let attrRichiesta;
      const sql = `
            SELECT DISTINCT
              val.id_richiesta_servizio_tcb AS "idRichiestaTcb", 
              val.cd_attributo AS "cdAttributo",
              coalesce(dom.tl_valore_testuale ->> '${args.locale}', dom.tl_valore_testuale ->> '${args.locale}') AS "tlValoreTestuale",
              attr.ty_dominio_tcb AS "dominioTcb", 
              val.cd_val_attributo AS "cdValAttributo"
            FROM ${context.tabelle.val_attributo_beneficiario} val
            LEFT JOIN ${context.tabelle.attributo} attr on (attr.cd_attributo = val.cd_attributo)
            LEFT JOIN ${context.tabelle.dominio_tcb} dom on (attr.ty_dominio_tcb = dom.ty_dominio_tcb and val.cd_val_attributo = dom.cd_dominio_tcb)
            LEFT JOIN ${context.tabelle.richiesta_servizio_tcb} rtcb on (rtcb.id_richiesta_servizio_tcb = val.id_richiesta_servizio_tcb)                
            WHERE val.id_richiesta_servizio_tcb = ${args.idRichiestaTcb} and val.cd_attributo = ${args.cdAttributo}`;
      context.logger.info(sql, args);
      return await context.db.any(sql, args);
    }
  },




  Mutation: {
    InviaRichiestaTCB: async (parent, args, context, info) => {
      try {
        return await context.db.tx('InviaRichiestaTCB', async t => {

          let idRichiestaBase = await t.any(selectByIdRichiestaEnte, args)
          const id_richiesta_servizio_base = idRichiestaBase[0].id_richiesta_servizio_base;
          await t.any(insertSttForInviaRichiestaTcb, { ...args, id_richiesta_servizio_base: id_richiesta_servizio_base })

           const { idRichiestaTCB } = args;
        });
      }
      catch (error) {
        throw new ApolloError(error.message, error.code);
      }

    },


    InviaRichiestaImpersonificazione: async (parent, args, context, info) => {
      try {
        await context.db.tx('InviaRichiestaImpersonificazione', async t => {

          let idRichiestaBase = await t.any(selectByIdRichiestaEnte, args)

          let JsImpersonificazione = await t.any(selectJsImpersonificazione, args)
          context.logger.info(JsImpersonificazione)
          if (JsImpersonificazione[0].js_impersonificazione.flUtenteCensito === "S") {

            const id_richiesta_servizio_base = idRichiestaBase[0].id_richiesta_servizio_base;

            await t.any(insertSttForJsImpersonificazione, {
              ...args,
              id_richiesta_servizio_base: id_richiesta_servizio_base,
              id_utente: JsImpersonificazione[0].js_impersonificazione.cd_utente
            })
          }
          else {
            const id_richiesta_servizio_base = idRichiestaBase[0].id_richiesta_servizio_base;
            await t.any(insertSttForJsImpersonificazione, {
              ...args,
              id_richiesta_servizio_base: id_richiesta_servizio_base,
              id_utente: JsImpersonificazione[0].js_impersonificazione.cd_utente
            })
          }
        })
      }
      catch (error) {
        throw new ApolloError(DELETE_ATTACHMENT_ERROR.message, DELETE_ATTACHMENT_ERROR.code);
      }
      return true;

    },



    AggiornaDatiStepTCB: async (parent, args, context, info) => {
      let sql, updated;
      context.logger.info(updateForAggiornaDatiStepTcb);
      return context.db.none(updateForAggiornaDatiStepTcb, args)
        .then(data => true)
        .catch(el => { throw new ApolloError(STEP_NOT_SAVED_ERROR.message, STEP_NOT_SAVED_ERROR.code) })
    },

    InoltraRichiestaServizioTCBEMail: async (parent, args, context, info) => {
      let risultatoFinale, risultato, sql;
      let senderData = {};
      senderData.idRichiesta = args.idRichiesta;

      args.nomeBottone = "Vedi richiesta";
      await context.db.tx('InviaEmailTCB', async t => {
        await t.batch([
          sql = `       select * 
                                  from ${context.tabelle.richiesta_servizio_ente}
                                  inner join ${context.tabelle.servizio_erogato_ente} ON id_servizio_ente = id_servizio_erogato_ente
                                  inner join ${context.tabelle.ente} ON id_ente_erogatore = id_ente
                                  inner join ${context.tabelle.contenuto} ON id_servizio_riferimento = id_contenuto
                                  where id_richiesta_servizio_ente = $[idRichiesta]                        
                                  `,
          context.logger.info(sql),
          await t.oneOrNone(sql, args).then(result => risultato = result)
        ]);
        senderData.nomeEnte = risultato.nm_ente;
        senderData.nomeServizio = risultato.tl_testo_1;
        args.senderData = senderData;
      })
      return risultatoFinale;

    },
    InserisciRichiestaServizioTcb: async (parent, args, context, info) => {
      let sql, rsFinale, risultato1, idRicEnte;
      const sequenceRichiestaBase = context.sequence.seq_richiesta_servizio_base;
      const sequenceRichiestaEnte = context.sequence.seq_richiesta_servizio_ente;
      await context.db.tx('servizioBaseAddTxt', async t => {
        await t.one(insertForRichiestaTcb, { ...args.input, sequenceRichiestaBase: sequenceRichiestaBase }).then(async contenuto => {
          risultato1 = contenuto;
        });

        await t.none(InsertSttForRichiestaTcb, { ...args.input, id_richiesta_servizio_base: risultato1.id_richiesta_servizio_base });

        await t.oneOrNone(selectNextValRichiestaEnte, { sequenceRichiestaEnte: sequenceRichiestaEnte }).then((result) => idRicEnte = parseInt(result.nextval));
        context.logger.info(idRicEnte)

        await t.one(insertRichiestaEnteTcb, {
          ...args.input,
          id_richiesta_servizio_base: risultato1.id_richiesta_servizio_base,
          sequenceRichiestaEnte: sequenceRichiestaEnte
        }).then(contenuto =>
          rsFinale = contenuto);

        await t.one(insertSttRichiestaEnteTcb, { ...args.input, id_richiesta_servizio_ente: rsFinale.id_richiesta_servizio_ente }).then(contenuto =>
          rsFinale = contenuto
        );


        await t.oneOrNone(insertRecensioneForRichiestaTcb, { id_richiesta_servizio_ente: rsFinale.id_richiesta_servizio_ente });

        const inserisciRichiestaTcbConst = inserisciRichiestaTcb(args);


        context.logger.info(args.input)
        await t.oneOrNone(inserisciRichiestaTcbConst, { ...args.input, id_richiesta_servizio_ente: rsFinale.id_richiesta_servizio_ente });

        args.input.arrayConfig.map(async (val) => {
          const insertValForRichiestaTcbConst = insertValForRichiestaTcb(val);
          await t.batch([

            context.logger.info(insertValForRichiestaTcbConst)
            , await t.oneOrNone(insertValForRichiestaTcbConst, { ...val, id_richiesta_servizio_ente: rsFinale.id_richiesta_servizio_ente })

          ]);
        });


        await t.oneOrNone(insertRecensioneStt, { ...args.input, id_richiesta_servizio_ente: rsFinale.id_richiesta_servizio_ente });
      })
        .then(() => (rsFinale.id_richiesta_servizio_ente))
        .catch((err) => {
          throw new ApolloError(REQUEST_TCB_INSERT_FAIL.message, REQUEST_TCB_INSERT_FAIL.code);
        });
      return rsFinale.id_richiesta_servizio_ente
    },


    InserisciDatiRichiestaVoceMenu2: async (parent, args, context, info) => {

      const sql = `
            INSERT INTO ${context.tabelle.val_attributo_domanda} (
                id_richiesta_servizio_tcb,
                cd_attributo,
                cd_val_attributo,
                tx_val,
                dt_val,
                tx_nota,
                tx_nota_op,
                fg_val,
                nr_val,
                fg_mansione_svolta,
                ts_modifica,
                ts_creazione
              )
              VALUES (
                $[id_richiesta_servizio_tcb], 
                $[cd_attributo],
                $[cd_val_attributo],                   
                $[tx_val],
                current_date,
                $[tx_nota],
                $[tx_nota_op],
                $[fg_val],
                $[nr_val],
                $[fg_mansione_svolta],
                localtimestamp,
                localtimestamp
              )
              `;
      context.logger.info(sql, args);
      return await context.db.oneOrNone(sql, args.input);
    },
    senderAdminEmail: async (args, context) => {
      context.logger.info('Invio email admin');
    },

    AnnullaRichiestaTCB: async (parent, args, context, info) => {
      let risultato = false;
      let richiestaBase;
      return await context.db.task(async t => {

        richiestaBase = await t.one(findUserByIdRequest, args.input);

        await t.oneOrNone(insertStateRequestEnte, { ...args.input, ...richiestaBase });
        await t.oneOrNone(insertStateRequestBase, { ...args.input, ...richiestaBase });
         //non mensionato sulla revisione 
      });
    },

    InviaAnnullaRichiestaTCB: async (parent, args, context, info) => {
      let risultato = false;
      
      return await context.db.task(async t => {
        const  richiestaBase = await t.one(findUserByIdRequest, args.input);

        const emailDomandaTCB = await t.oneOrNone(estraiEmailDomandaTCB, { idDomandaTCB: args.input.id_richiesta_servizio_ente, cdAttributo: attributo.TX_EMAIL_CONTATTO });
        const sendEmail = SingletonFactoryEmail.create(EMAIL_TYPE.RICHIESTA_TCB.code, t);
        try {
          await sendEmail.sendEmailToStaffWeMi(args.input.id_richiesta_servizio_ente, TEMPLATE_RICHIESTA_ANNULLAMENTO_DOMANDA_TCB);
          await sendEmail.sendEmailFromStaffWeMiWithButton(args.input.id_richiesta_servizio_ente, TEMPLATE_ANN_RIC_ENTE, 'Riepilogo richiesta', PAGE_REQUESTSINDEX_URL);
        } catch (error) {
          throw new ApolloError(SEND_EMAIL_ERROR.message, SEND_EMAIL_ERROR.code);
        };

        await t.oneOrNone(insertStateRequestEnte, { ...args.input, ...richiestaBase });
        await t.oneOrNone(insertStateRequestBaseRichiestaAnnullamento, { ...args.input, ...richiestaBase });

        return true;

      });
    },

    InserisciDatiDisponibilita: async (parent, args, context, info) => {
      let result = false, elimina;
      let sql;
      await context.db.tx('datiRichiestaDisponibilita', async t => {
        let attributi = args.input.arrayConfig;
        for (let i = 0; i < attributi.length; i += 1) {
          let valori = attributi[i].valori;
          if (valori) {
            if (valori[0].cd_val_attributo === -1) {
              sql = ` DELETE FROM ${context.tabelle.val_attributo_domanda}
                        WHERE 
                        id_richiesta_servizio_tcb =${args.input.idRichiestaTcb} and 
                            cd_attributo =${attributi[i].cd_attributo};`;
              context.logger.info(sql, args);
              await t.oneOrNone(sql, args).then(_ => elimina = true).catch(error => { throw new Error(error) });
            }

            for (let j = 0; j < valori.length; j += 1) {
              let val = valori[j];
              if (valori[0].cd_val_attributo !== -1) {
                sql = `
                            SELECT *
                            FROM ${context.tabelle.val_attributo_domanda}
                            WHERE id_richiesta_servizio_tcb =${args.input.idRichiestaTcb} and 
                            cd_attributo =${attributi[i].cd_attributo} and cd_val_attributo = ${valori[j].cd_val_attributo}
                        `;
                context.logger.info(sql, args);
                await t.oneOrNone(sql, args).then(risultato => result = risultato).catch(error => { throw new Error(error) });
                context.logger.info(val)
                if (result !== null) {

                  sql = `
                          UPDATE ${context.tabelle.val_attributo_domanda}
                          SET  
                          ${val.tx_val ? `tx_val ='${val.tx_val}', ` : ''}
                          ${!isNullOrUndefined(val.nr_val) ? `nr_val = ${val.nr_val},` : ``}
                          cd_val_attributo = ${val.cd_val_attributo},
                          ${val.dt_val ? `dt_val='${val.dt_val.toJSON().split('T')[0]}',` : ''}
                          ${val.fg_val ? `fg_val='${val.fg_val}',` : ''}
                          ${val.tx_nota ? `tx_nota='${val.tx_nota}',` : ''}
                          ${val.tx_nota_op ? `tx_nota_op='${val.tx_nota_op}',` : ''}
                          ${val.fg_mansione_svolta ? `fg_mansione_svolta='${val.fg_mansione_svolta}'` : ''}
                          ts_modifica=localtimestamp
                          WHERE  id_richiesta_servizio_tcb =${args.input.idRichiestaTcb} and 
                          cd_attributo =${attributi[i].cd_attributo} and cd_val_attributo=${valori[j].cd_val_attributo};
                        `;
                  context.logger.info(sql, args);
                  await t.oneOrNone(sql, args).then(_ => result = true).catch(error => { throw new Error(error) });
                }
                else {
                  if (valori.length === 1) {
                    sql = ` DELETE FROM ${context.tabelle.val_attributo_domanda}
                            WHERE 
                            id_richiesta_servizio_tcb =${args.input.idRichiestaTcb} and 
                                cd_attributo =${attributi[i].cd_attributo};`;
                    context.logger.info(sql, args);
                    await t.oneOrNone(sql, args).then(_ => elimina = true).catch(error => { throw new Error(error) });
                  }
                  sql = `
                        INSERT INTO ${context.tabelle.val_attributo_domanda}(
                            id_richiesta_servizio_tcb, 
                            cd_attributo, 
                            ${val.tx_val ? 'tx_val,' : ''}
                            ${!isNullOrUndefined(val.nr_val) ? 'nr_val,' : ``}
                            cd_val_attributo,
                            ${val.dt_val ? 'dt_val,' : ''}
                            ${val.fg_val ? 'fg_val,' : ''}
                            ${val.tx_nota ? 'tx_nota,' : ''}
                            ${val.tx_nota_op ? 'tx_nota_op,' : ''}
                            ${val.fg_mansione_svolta ? 'fg_mansione_svolta,' : ''}
                            ts_modifica, 
                            ts_creazione)
                            VALUES (${args.input.idRichiestaTcb}, 
                                        ${attributi[i].cd_attributo},
                                        ${val.tx_val ? `'${val.tx_val}',` : ''}
                                        ${!isNullOrUndefined(val.nr_val) ? `${val.nr_val},` : ``}
                                        ${val.cd_val_attributo ? `${val.cd_val_attributo},` : `1,`}
                                        ${val.dt_val ? `'${val.dt_val.toJSON().split('T')[0]}',` : ``}
                                        ${val.fg_val ? `'${val.fg_val}',` : ``}
                                        ${val.tx_nota ? `'${val.tx_nota}',` : ``}
                                        ${val.tx_nota_op ? `'${val.tx_nota_op}',` : ``}
                                        ${val.fg_mansione_svolta ? `'${val.fg_mansione_svolta}',` : ``}
                                      localtimestamp, 
                                      localtimestamp 
                                      );
                        `;
                  context.logger.info(sql, args);
                  await t.oneOrNone(sql, args).then(_ => result = true).catch(error => { throw new Error(error) });
                }
              }
              if (attributi[i].cd_attributo >= 1 && attributi[i].cd_attributo <= 4) {
                sql = `
                            UPDATE ${context.tabelle.richiesta_servizio_tcb}
                            SET 
                                tx_lunedi_cal_disp=$[tx_lunedi_cal_disp],
                                tx_martedi_acl_disp=$[tx_martedi_cal_disp],
                                tx_mercoledi_cal_disp=$[tx_mercoledi_cal_disp],
                                tx_giovedi_cal_disp=$[tx_giovedi_cal_disp],
                                tx_venerdi_cal_disp=$[tx_venerdi_cal_disp],
                                tx_sabato_cal_disp=$[tx_sabato_cal_disp],
                                tx_domenica_cal_disp=$[tx_domenica_cal_disp]
                            WHERE id_richiesta_servizio_tcb=${args.input.idRichiestaTcb}
                            `;
                context.logger.info(sql, args);
                await t.oneOrNone(sql, val.calendario).then(_ => result = true).catch(error => { throw new Error(error) });
              }

            }
          }
        }
      });
      return result;
    },
    InserisciDatiBeneficiarioStep2Badante: async (parent, args, context, info) => {
      let sql, cdAttr;
      await context.db.tx('datiRichiesta004', async t => {

        await t.batch([
          sql = `
                               SELECT cd_attributo
                               FROM ${context.tabelle.val_attributo_domanda}
                                    WHERE 
                                    id_richiesta_servizio_tcb =${args.input.idRichiestaTcb};`
          , context.logger.info(sql)
          , await t.many(sql, args.input).then((result) => cdAttr = result.map(el => { return parseInt(el.cd_attributo) }))
        ])
        context.logger.info('cdAttributo:', cdAttr)

        args.input.arrayConfig.map(async (val) => {
          context.logger.info(val.cd_attributo)
          if (cdAttr.includes(val.cd_attributo) && val.cd_attributo !== 61) {
            context.logger.info('val.cdVaLaTTR', val.cdValAttributo)
            if (parseInt(val.cd_val_attributo) >= 0) {
              await t.batch([
                sql = `
                               UPDATE ${context.tabelle.val_attributo_domanda}
                               SET cd_attributo = ${val.cd_attributo}, 
                               ${val.cd_val_attributo ? `cd_val_attributo =  ${val.cd_val_attributo},` : ``}
                               ${val.tx_val ? `tx_val = '${val.tx_val}',` : ``}
                               ${!isNullOrUndefined(val.nr_val) ? `nr_val = ${val.nr_val},` : `nr_val = 0,`}
                               ${val.fg_val ? `fg_val = ${val.fg_val},` : ``}
                               ${val.tx_nota_op ? `tx_nota_op = ${val.tx_nota_op},` : ``}
                               ${val.dt_value ? `dt_value = ${val.dt_value},` : ``}
                               ${val.fg_mansione_svolta ? `fg_mansione_svolta = ${val.fg_mansione_svolta},` : ``}
                                   ts_modifica = localtimestamp
                                    WHERE 
                                    id_richiesta_servizio_tcb =${args.input.idRichiestaTcb} and 
                                        cd_attributo =${val.cd_attributo};`
                , context.logger.info(sql)
                , await t.oneOrNone(sql, args.input)
              ])
            }
            else if (parseInt(val.cd_val_attributo) === -1) {
              await t.batch([
                sql = `
                               DELETE FROM ${context.tabelle.val_attributo_domanda}
                                    WHERE 
                                    id_richiesta_servizio_tcb =${args.input.idRichiestaTcb} and 
                                        cd_attributo =${val.cd_attributo};`
                , context.logger.info(sql)
                , await t.oneOrNone(sql, args.input)
              ])
            }
          }
          else if (!cdAttr.includes(val.cd_attributo) && val.cd_attributo !== 61) {
            await t.batch([
              sql = `
                    INSERT INTO ${context.tabelle.val_attributo_domanda}(
                        id_richiesta_servizio_tcb, 
                        cd_attributo, 
                        ${val.tx_val ? 'tx_val,' : ''}
                        ${!isNullOrUndefined(val.nr_val) ? 'nr_val,' : ``}
                        cd_val_attributo,
                        ${val.dt_val ? 'dt_val,' : ''}
                        ${val.fg_val ? 'fg_val,' : ''}
                        ${val.tx_nota ? 'tx_nota,' : ''}
                        ${val.tx_nota_op ? 'tx_nota_op,' : ''}
                        ${val.fg_mansione_svolta ? 'fg_mansione_svolta,' : ''}
                        ts_modifica, 
                        ts_creazione)
                        VALUES (${args.input.idRichiestaTcb}, 
                                    ${val.cd_attributo},
                                    ${val.tx_val ? `'${val.tx_val}',` : ''}
                                    ${!isNullOrUndefined(val.nr_val) ? `${val.nr_val},` : ``}
                                    ${val.cd_val_attributo ? `${val.cd_val_attributo},` : `1,`}
                                    ${val.dt_val ? `${val.dt_val},` : ``}
                                    ${val.fg_val ? `${val.fg_val},` : ``}
                                    ${val.tx_nota ? `${val.tx_nota},` : ``}
                                    ${val.tx_nota_op ? `${val.tx_nota_op},` : ``}
                                    ${val.fg_mansione_svolta ? `${val.fg_mansione_svolta},` : ``}
                                  localtimestamp, 
                                  localtimestamp 
                                  );
                        `
              , context.logger.info(sql)
              , await t.oneOrNone(sql, args.input)

            ]);
          }
        })
        if (args.input.arrayConfig.filter(el => { return el.cd_attributo === 61 })[0] && cdAttr.includes(61)) {
          await t.batch([
            sql = `
                            DELETE FROM ${context.tabelle.val_attributo_domanda}
                            where id_richiesta_servizio_tcb = ${args.input.idRichiestaTcb} AND cd_attributo = 61;`
            , context.logger.info(sql)
            , await t.oneOrNone(sql, args.input)
          ]);
          args.input.arrayConfig.map(async (val) => {
            if (val.cd_attributo === 61)
              await t.batch([
                sql = `
                    INSERT INTO ${context.tabelle.val_attributo_domanda}(
                        id_richiesta_servizio_tcb, 
                        cd_attributo, 
                        ${val.tx_val ? 'tx_val,' : ''}
                        ${!isNullOrUndefined(val.nr_val) ? 'nr_val,' : ``}
                        cd_val_attributo,
                        ${val.fg_val ? 'fg_val,' : ''}
                        ts_modifica, 
                        ts_creazione)
                        VALUES (${args.input.idRichiestaTcb}, 
                                    ${val.cd_attributo},
                                    ${val.tx_val ? `'${val.tx_val}',` : ''}
                               ${!isNullOrUndefined(val.nr_val) ? `nr_val = ${val.nr_val},` : ``}
                                    ${!isNullOrUndefined(val.cd_val_attributo) ? `${val.cd_val_attributo},` : `1,`}
                                    ${val.fg_val ? `${val.fg_val},` : ``}
                                  localtimestamp, 
                                  localtimestamp 
                                  );
                        `
                , context.logger.info(sql)
                , await t.oneOrNone(sql, args.input)

              ]);
          })
        } else {
          args.input.arrayConfig.map(async (val) => {
            if (val.cd_attributo === 61)
              await t.batch([
                sql = `
                    INSERT INTO ${context.tabelle.val_attributo_domanda}(
                        id_richiesta_servizio_tcb, 
                        cd_attributo, 
                        ${val.tx_val ? 'tx_val,' : ''}
                        ${!isNullOrUndefined(val.nr_val) ? 'nr_val,' : ``}
                        cd_val_attributo,
                        ${val.fg_val ? 'fg_val,' : ''}
                        ts_modifica, 
                        ts_creazione)
                        VALUES (${args.input.idRichiestaTcb}, 
                                    ${val.cd_attributo},
                                    ${val.tx_val ? `'${val.tx_val}',` : ''}
                               ${!isNullOrUndefined(val.nr_val) ? `nr_val = ${val.nr_val},` : ``}
                                    ${!isNullOrUndefined(val.cd_val_attributo) ? `${val.cd_val_attributo},` : `1,`}
                                    ${val.fg_val ? `${val.fg_val},` : ``}
                                  localtimestamp, 
                                  localtimestamp 
                                  );
                        `
                , context.logger.info(sql)
                , await t.oneOrNone(sql, args.input)

              ]);
          })
        }

        await t.batch([
          sql = `
                            UPDATE ${context.tabelle.richiesta_servizio_tcb}
                            SET ts_ult_modifica = localtimestamp
                                          where id_richiesta_servizio_tcb = ${args.input.idRichiestaTcb};                                        
                                `
          , context.logger.info(sql)
          , await t.oneOrNone(sql, args.input)
        ]);

      })
      return args.input.idRichiestaTcb
    },

    RimuoviRichiestaServizioTcb: async (parent, args, context) => {
      const idRichiesta = args.idRichiesta;
      context.logger.info('id-richiesta', idRichiesta);

      await context.db
        .tx(async t => {
          const deleteRichServEnteStt = `
                        DELETE FROM ${context.tabelle.richiesta_servizio_ente_stt}
                        WHERE id_richiesta_servizio_ente = $1
                    `;
          await t.result(deleteRichServEnteStt, [idRichiesta]);

          const deleteRecensioneEnteStt = `
                        DELETE FROM ${context.tabelle.recensione_ente_stt}
                        WHERE id_rich_serv_rec = $1
                    `;
          await t.result(deleteRecensioneEnteStt, [idRichiesta]);

          const deleteRecensioneEnte = `
                        DELETE FROM ${context.tabelle.recensione_ente}
                        WHERE id_rich_serv_rec = $1
                    `;
          await t.result(deleteRecensioneEnte, [idRichiesta]);

          const deleteValAttributoDomandaServLav = `
                        DELETE FROM ${context.tabelle.val_attributo_rel_dom_serv_lav}
                        WHERE id_richiesta_servizio_tcb = $1
                    `;
          await t.result(deleteValAttributoDomandaServLav, [idRichiesta]);

          const deleteValAttributoDomanda = `
                        DELETE FROM ${context.tabelle.val_attributo_domanda}
                        WHERE id_richiesta_servizio_tcb = $1
                    `;
          await t.result(deleteValAttributoDomanda, [idRichiesta]);

          const deleteValAttributoBeneficiario = `
                        DELETE FROM ${context.tabelle.val_attributo_beneficiario}
                        WHERE id_richiesta_servizio_tcb = $1
                    `;
          await t.result(deleteValAttributoBeneficiario, [idRichiesta]);

          const deleteBeneficiarioRichiestaTcb = `
                        DELETE FROM ${context.tabelle.beneficiario_ric_serv_tcb}
                        WHERE id_richiesta_servizio_tcb = $1
                    `;
          await t.result(deleteBeneficiarioRichiestaTcb, [idRichiesta]);

          const deleteRichiestaServizioTcb = `
                        DELETE FROM ${context.tabelle.richiesta_servizio_tcb}
                        WHERE id_richiesta_servizio_tcb = $1
                    `;
          await t.result(deleteRichiestaServizioTcb, [idRichiesta]);

          const deleteRichiestaServizioEnte = `
                        DELETE FROM ${context.tabelle.richiesta_servizio_ente}
                        WHERE id_richiesta_servizio_ente = $1
                        RETURNING id_richiesta_servizio_base
                    `;
          const result = await t.result(deleteRichiestaServizioEnte, [idRichiesta]);
          const [firstRecord] = result.rows;
          const { id_richiesta_servizio_base: idRichiestaServizioBase } = firstRecord;

          const deleteRichiestaServizioBaseStt = `
                        DELETE FROM ${context.tabelle.richiesta_servizio_base_stt}
                        WHERE id_richiesta_servizio = $1
                    `;
          await t.result(deleteRichiestaServizioBaseStt, [idRichiestaServizioBase]);

          const deleteRichiestaServizioBase = `
                        DELETE FROM ${context.tabelle.richiesta_servizio_base}
                        WHERE id_richiesta_servizio_base = $1
                    `;
          await t.result(deleteRichiestaServizioBase, [idRichiestaServizioBase]);
        });

      context.logger.info(`Transazione per rimozione richiesta servizio tcb (ID => ${idRichiesta}) eseguita.`);
      return idRichiesta;
    }

  },

}