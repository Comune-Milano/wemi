/** @format */

import { gql } from 'apollo-server-express';
import { CITTADINO, LAVORATORE, AMMINISTRATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';

export default gql`
type DatiRichiestaTCB{
  idRichiesta: Int!
  idRichiestaBase: Int
  idServizio: Int
  nomeUtente: String
  cognomeUtente: String
  dataRichiesta: Timestamp
  dataCreazione: Timestamp
  tipoRichiesta: String
  statoRichiesta: String
  periodoDal: Timestamp
  periodoAl: Timestamp
  calendario: JSON
  idTipologiaOrario: Int
}

type RichiestaServizioTcbExtended{
  idRichiestaTCB: Int!
  qtBeneficiari: Int
  txLunedi: String
  txMartedi: String
  txMercoledi: String
  txGiovedi: String
  txVenerdi: String
  txSabato: String
  txDomenica: String
  oreDisponibilita: Int
  idRichiestaBase: Int
  idUtente: Int
  datiRichiesta: JSON
  tsCreazione: Timestamp
  idRichiestaEnte: Int
  idServizioErogato: Int
  costoTotaleEnte: Float
  attributo: [AttributoTCB]
  attributoBeneficiario: [AttributoBeneficiarioTCB]
  beneficiarioRichiesta: [AttributoBeneficiarioTCB]
}

type BeneficiarioRichiesta{
  pgBeneficiario: Int!
  tsCreazione: Timestamp
}


type RichiestaServizioTcb{
  id_richiesta_servizio_tcb: Int!
  qt_beneficiari: Int
  tx_lunedi_cal_disp: String
  tx_martedi_cal_disp: String
  tx_mercoledi_cal_disp: String
  tx_giovedi_cal_disp: String
  tx_venerdi_cal_disp: String
  tx_sabato_cal_disp: String
  tx_domenica_cal_disp: String
  nr_ore_totali_dip: Int
  ts_ult_modifica: Timestamp!
  ts_creazione: Timestamp!
}

type DatiStepTCB {
  cd_stato_pag_beneficiario: String
  cd_stato_pag_mansioni: String
  cd_stato_pag_casa: String
  cd_stato_pag_animali: String
  cd_stato_pag_disponibilita: String
  cd_stato_pag_preferenzelav: String
  cd_stato_pag_sedelavoro: String
  idUtenteRiferimento: Int
  statoRichiesta: Int
}


type DatiConfigurazioneRichiesta001 {
  idRichiestaTcb: Int!
  idServizio: Int!
  numeroPersone: Int
  orario: AttributoTCB
  benFlag: FlagTCB
  casaFlag: FlagTCB
}

type DatiConfigurazioneRichiesta002 {
  beneficiari: [BeneficiarioTCB]
  altriFratelliFlag: FlagTCB  
  altriFlag: FlagTCB
  nonniFlag: FlagTCB
}
type etaBeneficiari {
  nrVal: Int
}

type FormFieldValues002 {
    relazioneFieldValues : [DominioTCB]
    relazioneFieldValuesTata : [DominioTCB]
    sessoFieldValues : [DominioTCB]
    fasciaEtaFieldValues : [DominioTCB]
    patologieFieldValues : [DominioTCB]
    altezzaFieldValues : [DominioTCB]
    corporaturaFieldValues : [DominioTCB]
    lingueParlateFieldValues : [DominioTCB]
    linguaItalianaFieldValues : [DominioTCB]
    deambulazioneFieldValues : [DominioTCB]
}

type DatiConfigurazioneRichiesta004 {
  idRichiestaTcb: Int
  superficieCasa: AttributoTCB
  numeroStanze: AttributoTCB
  numeroBagni: AttributoTCB
  abitazione: AttributoTCB
  piano: TextAttrTCB
  altroValue: String
  mansioni: [MansioneTcb]
  giardinoFlag: FlagTCB
  terrazzaFlag: FlagTCB
  ascensoreFlag: FlagTCB
  fumatoriFlag: FlagTCB
  flagCasa:FlagTCB
}

type DatiConfigurazioneRichiestaDisponibilita{
  idRichiestaTcb: Int
  disponibilita: [AttributoDisponibilitaTCB]
  calendarioTCB: [JSON]
}

type DatiConfigurazioneRichiesta005 {
  idRichiestaTcb: Int!
  animaliFlag: FlagTCB
  altriAnimaliFlag: FlagTCB
  numeroCani: NrAttrTCB
  numeroGatti: NrAttrTCB
  dettaglioAnimali: TextAttrTCB
  mansioni: [MansioneTcb]
}


type DatiConfigurazioneRichiesta003 {
  idRichiestaTcb: Int
  mansioni: [MansioneTcb]

}

input ArrayConfig {
  cd_attributo: Float
  cd_val_attributo: Float
  cd_attributo_2: Float
  cd_val_attributo_2: [Float]
  arrayBen: [JSON]
  fg_val: String
  tx_val: String
  nr_val: Float
  dt_val: Date
  tx_nota: String
  tx_nota_op:String
  fg_mansione: String
  dc_val: Float
}

  extend type RichiestaServizioBase{
     richiestaServizioTcb: RichiestaServizioTcb
  }

  extend type Mutation {
    InserisciRichiestaServizioTcb(input: ServizioTcbInput!): Int @auth @protect(roles: [${CITTADINO},${LAVORATORE},${AMMINISTRATORE}])
    AggiornaDatiStepTCB(idRichiesta: Int!, steps: DatiStepTCBInput!): Boolean @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiesta")
    InserisciDatiRichiestaVoceMenu2(input: DatiVoceMenu2Tcb!):JSON @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "input.id_richiesta_servizio_tcb")
    InserisciDatiBeneficiarioStep2Badante(input: DatiBeneficiarioStep2!) : Boolean @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}])
    InserisciDatiDisponibilita(input: DatiDisponibilita!) : Boolean @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "input.idRichiestaTcb")
    InoltraRichiestaServizioTCBEMail(idDestinatario: Int!,idRichiesta:Int!):Boolean @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiesta")
    RimuoviRichiestaServizioTcb (idRichiesta: ID!): ID! @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiesta")
    InviaRichiestaTCB(idRichiestaTCB: Int, idUtente: Int, costoTCB: Float): Boolean @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTCB")
    AnnullaRichiestaTCB(input: AnnullaRichiestaInput!): Boolean @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "input.id_richiesta_servizio_ente")
    InviaAnnullaRichiestaTCB(input: AnnullaRichiestaInput!): Boolean @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "input.id_richiesta_servizio_ente")
    InviaRichiestaImpersonificazione(idRichiestaTCB: Int, costoTCB: Float): Boolean @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTCB")
    senderAdminEmail(idRichiesta: Int): Boolean #Eliminare
  }

  extend type Query {
    estraiRichiestaServizioTCB(idRichiestaTcb: Int!): DatiRichiestaTCB @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_TCB_CANDIDACY_MANAGEMENT_AND_QUESTION_MANAGEMENT}])
    EstraiDatiConfigurazioneRichiesta001(idRichiestaTcb: Int!): DatiConfigurazioneRichiesta001 @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
    EstraiDatiConfigurazioneRichiesta002(idRichiestaTcb: Int!, idServizio: Int!): DatiConfigurazioneRichiesta002 @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
    EstraiEtaBeneficiari(idRichiestaTcb: Int!): [etaBeneficiari] @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
    EstraiFormFieldValues002(idServizio: Int!): FormFieldValues002 @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}])
    EstraiDatiConfigurazioneRichiesta003(input: DatiConfigurazioneRichiesta003Input):  DatiConfigurazioneRichiesta003 @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "input.idRichiestaTcb")
    EstraiDatiConfigurazioneRichiesta004(idRichiestaTcb: Int!): DatiConfigurazioneRichiesta004 @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
    EstraiDatiConfigurazioneRichiesta005(idRichiestaTcb: Int!): DatiConfigurazioneRichiesta005 @auth @protect(roles: [${CITTADINO}, ${LAVORATORE},${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
    EstraiImportoDomandaTCB(idRichiestaTcb: Int, arrCdAttributi: [Int]): JSON @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}])
    EstraiDatiConfigurazioneRichiestaDisponibilita(datiDisponibilita: DatiReferenzaLavoratore!): DatiConfigurazioneRichiestaDisponibilita @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "datiDisponibilita.idRichiestaTcb")
    EstraiDatiConfigurazioneRichiesta008(datiRichiesta: DatiRichiesta!): [AttributoDisponibilitaTCB] @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "datiRichiesta.idRichiestaTcb")
    EstraiStatoDomandaTCB(idDomandaTCB : Int!): JSON
    EstraiUtenteDomandaTCB(idDomandaTCB : Int!): JSON
    EstraiDatiStepTCB(idRichiestaTcb: Int!): DatiStepTCB @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
    EstraiAttributoTCBRichiesta(idRichiestaTcb: Int!, cdAttributo: Float!, locale: String): [AttributoTCB] @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
    EstraiDatiReferenzaLavoratore(idRichiestaTcb: Int!, arrayConfig: [Int]): [AttributoDisponibilitaTCB] @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
    EstraiAttributiDomandaTCB(idRichiestaTcb: Int!, arrayConfig: [Int]): [AttributoDisponibilitaTCB] @auth @protect(roles: [${CITTADINO}, ${LAVORATORE}, ${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_TCB.code}, argsKey: "idRichiestaTcb")
  }
  input DatiReferenzaLavoratore {
    idRichiestaTcb: Int!
    arrayConfig: [Int]
  }
  input DatiRichiesta{
    idRichiestaTcb: Int!
    arrayConfig: [Int]
  }
  input AnnullaRichiestaInput {
    id_richiesta_servizio_ente: Int!
  }
  input DatiDisponibilita{
    idRichiestaTcb: Int!
    arrayConfig: [ArrayConfig]
  }
  input ArrayConfigurazione{
    cd_attributo: Float
    valori: [ValoriConfigurazione]
  }
  input ValoriConfigurazione{
    cd_val_attributo: Float
    fg_val: String
    tx_val: String
    nr_val: Int
    dt_val: Date
    tx_nota: String
    tx_nota_op:String
    fg_mansione: String
    calendario: Calendario
  }

input Calendario{
  tx_lunedi_cal_disp: String
  tx_martedi_cal_disp: String
  tx_mercoledi_cal_disp: String
  tx_giovedi_cal_disp: String
  tx_venerdi_cal_disp: String
  tx_sabato_cal_disp: String
  tx_domenica_cal_disp: String
}

input DatiStepTCBInput{
  cd_stato_pag_beneficiario: String
  cd_stato_pag_mansioni: String
  cd_stato_pag_casa: String
  cd_stato_pag_animali: String
  cd_stato_pag_disponibilita: String
  cd_stato_pag_preferenzelav: String
  cd_stato_pag_sedelavoro: String
}


  input DatiBeneficiarioStep2{
    id: Int!
  }

  input InputImpersonificazione {
    cdOperatore: Int
    cd_utente: Int
    cognomeUtente: String
    nomeUtente: String
    cfUtente: String
    emailUtente: String
    flUtenteCensito: String
  }

  input ServizioTcbInput {
    id_utente_richiedente: Int!
    ty_richiesta: Int
    arrayConfig: [ArrayConfig]
    id_servizio_erogato_ente: Int!
    js_impersonificazione: InputImpersonificazione
  }


  input DatiVoceMenu2Tcb {
    id_richiesta_servizio_tcb: Int,
    cd_attributo:Float,
    cd_val_attributo: Float,
    tx_val: String,
    dt_val: Date,
    tx_nota: String,
    tx_nota_op: String,
    fg_val: String,
    nr_val: Int,
    fg_mansione_svolta:String,
    ts_modifica: Timestamp,
    ts_creazione: Timestamp
}

input DatiConfigurazioneRichiesta003Input {
  idRichiestaTcb: Int!,
  cdServizioTcb: Int!,
  locale: String
}

`;






