import { gql } from 'apollo-server-express';
import { UNDER_AUTHORIZATIONS_LIST } from 'constants/authorization';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';
import { CITTADINO, LAVORATORE, AMMINISTRATORE, AMMINISTRATORE_ENTE, OPERATORE_ENTE } from 'constants/usercode';

export default gql`

  type State {
    id: Int 
    description: String
  }

  type Voucher {
    idVoucher: Int!
    transazioniVoucher: Boolean
    inizioValidita: Date
    fineValidita: Date
    state: String
    code: String
    importoMax: Float
    cfIntestatario: String
    nomeTitolare: String
    cognomeTitolare: String
    cfMinore: String
    totalImport: Float
    remainingImport: Float
    countedImport: Float
    emailContatto: String
    cellContatto: String
    bando: String
    dateLastModified: Timestamp
    lastUseTimeStamp: Timestamp
    endValidity: Timestamp
  }

  type CitizenVoucher {
    idVoucher: Int!
    transazioniVoucher: Boolean
    inizioValidita: Date
    fineValidita: Date
    state: String
    code: String
    cfIntestatario: String
    nomeTitolare: String
    cognomeTitolare: String
    cfMinore: String
    totalImport: Float
    remainingImport: Float
    countedImport: Float
    bando: String
    dateLastModified: Timestamp
  }

  type Transaction {
    idTransazioneVoucher: Int!
    idVoucher: Int!
    idRichiestaServizioEnte: Int
    idInternoTransazione: Int
    importoSpeso: Float
    state: String
    nomeEnte: String
    emailContatto: String
    cellContatto: String
    codiceVoucher: String
    dataUtilizzoVoucher: Date
    dataContabilizzazione: Date
    dataStorno: Date
    servizioAcquistato: String
    bando: String
    cfBeneficiario: String
    cfMinore: String
    cfPivaEnte: String
    nominativoTitolareEnte: String
    inizioValidita: Date
    fineValidita: Date
    importoVoucher: Float
  }

  type CitizenTransaction {
    idTransazioneVoucher: Int!
    idVoucher: Int!
    idRichiestaServizioEnte: Int
    idInternoTransazione: Int
    importoSpeso: Float
    state: String
    nomeEnte: String
    codiceVoucher: String
    dataUtilizzoVoucher: Date
    dataContabilizzazione: Date
    dataStorno: Date
    servizioAcquistato: String
    bando: String
    cfBeneficiario: String
    cfMinore: String
    cfPivaEnte: String
    nominativoTitolareEnte: String
    inizioValidita: Date
    fineValidita: Date
    importoVoucher: Float
  }

  type Vouchers {
    list: [Voucher]
    totalRows: Int
  }

  type CitizenVouchers {
    list: [CitizenVoucher]
    totalRows: Int
  }

  type TransactionsVouchers {
    list: [Transaction]
    totalRows: Int 
  }

  type CitizenTransactionsVouchers {
    totalRows: Int
    list: [CitizenTransaction]
    voucherInfo: CitizenVoucher
  }

  input FiltersVoucher {
    codiceVoucher: String
    cfIntestatario: String
    cfMinore: String
    state: Int
    inizioValidita: Date
    fineValidita: Date
    bando: String
    minImporto: Float
    maxImporto: Float
    nonUtilizzato: Boolean
  }

  input FiltersTransaction {
    codiceVoucher: String
    state: Int
    dataTransazioneDa: Date
    dataTransazioneA: Date
    dataContabilizzazioneDa: Date
    dataContabilizzazioneA: Date
    importoTransazioneMin: Float
    importoTransazioneMax: Float
    cfIntestatario: String
    cfMinore: String
    bando: String
  }

  input FiltersTransactionDownload {
    idVouchersList: [Int]
    filters: FiltersTransaction
  }

  input FiltersVoucherDownload {
    filters: FiltersVoucher
  }

  input FiltersVoucherListInput {
    page: Int!
    elementsPerPage: Int!
    filters: FiltersVoucher
  }

  input FiltersTransactionListInput {
    page: Int!
    elementsPerPage: Int!
    filters: FiltersTransaction
  }

  type StatiVoucher {
    value: Int
    textValue: String
  }

  type StatiTransazioneVoucher {
    value: Int
    textValue: String
  }

  type SostegnoEconomico {
    value: Int
    textValue: String
  }

  extend type Query {
    getMaxOrderVoucher: Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    getVoucherList(params: FiltersVoucherListInput): Vouchers! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    getVoucher(idVoucher: Int!): Voucher @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    EstraiStatiVoucher: [StatiVoucher] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    getVoucherTransactionList(params: FiltersTransactionListInput): TransactionsVouchers! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    getVoucherTransaction(idVoucher: Int!, page: Int!, elementsPerPage: Int! ): TransactionsVouchers @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    getUsableVoucherListByUser( idRichiesta: Int!): [Voucher] @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "idRichiesta")
    getVoucherByIdRichiesta( idRichiesta: Int!, qtPersone: Int!): Voucher @auth @protect(roles: [${AMMINISTRATORE_ENTE},${OPERATORE_ENTE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "idRichiesta")
    getTransactionDetails(idTransaction: Int!): Transaction! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    EstraiStatiTransazioneVoucher: [StatiTransazioneVoucher] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    EstraiSostegnoEconomico: [SostegnoEconomico] @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    getCitizenVoucherList(page: Int!, elementsPerPage: Int!): CitizenVouchers @auth @protect(roles: [${CITTADINO},${LAVORATORE}])
    getCitizenVoucherTransactionsList(idVoucher: Int!, page: Int!, elementsPerPage: Int!): CitizenTransactionsVouchers @auth @protect(roles: [${CITTADINO},${LAVORATORE}])
    hasCitizenVoucher: Boolean! @auth @protect(roles: [${CITTADINO},${LAVORATORE}])
    hasTransactionsCont: Boolean! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    hasVouchersCont: Boolean! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    downloadTransactionsCont(params: FiltersTransactionDownload): JSON! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    downloadVouchersCont(params: FiltersVoucherDownload): JSON! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
  }

  extend type Mutation {
    annullaVoucher(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    ripristinoVoucher(id: Int!): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    stornoTransazioneVoucher(id: [Int]): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    contabilizzaTransazioneVoucher(id: [Int]): Int @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    elaboraVouchers(sostegnoEconomico: Int!, media: mediaADDInput): JSON! @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    uploadVouchers(idImportazione: Int!): Boolean @auth @protect(roles: [${AMMINISTRATORE}]) @validate(type: ${ENUM_VALIDATOR.ADMIN_VALIDATOR.code}, argsKey: "") @allowed(list: [${UNDER_AUTHORIZATIONS_LIST.AUTHORIZATIONS_VOUCHER_MANAGEMENT}])
    setVoucherTimestamp (idRichiesta: Int!): [Voucher] @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "idRichiesta")
  }

`;