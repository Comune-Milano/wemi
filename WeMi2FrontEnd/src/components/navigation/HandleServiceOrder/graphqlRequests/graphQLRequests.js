
const datiRicServEnteQueryName = 'EstraiRichiestaServizioEntePerOrdine';

export const estraiDatiRichiestaServizioEnte = [
  '',
  `query ${datiRicServEnteQueryName}($idRichiestaServizioEnte: Int!) {
    ${datiRicServEnteQueryName}(
      idRichiestaServizioEnte: $idRichiestaServizioEnte
    ) {
      nomeEnte,
      nomeEnteCompleto,
      idEnte,
      idRichiestaServizioEnte,
      idRichiestaServizioBase,
      idServizioErogatoEnte,
      costoTotaleCalcolato,
      costoTotaleEnte,
      periodoPropostoDal,
      periodoPropostoAl,
      altraModalitaPagamento,
      scadenzaAcquisto,
      noteEnte,
      descrizioneServizioErogatoEnte,
      logoEnte,
      nomeServizioEnte,
      jsonDatiLavoratore,
      jsonDatiRichiesta,
    }
  }`,
  datiRicServEnteQueryName,
];

const latestPaymentInfoQueryName = 'latestSuccessfullPayment';

export const latestPaymentInfoQuery = [
  '',
  `query ${latestPaymentInfoQueryName}{
    ${latestPaymentInfoQueryName}{
      jsDatiFatturazione,
      jsDatiPagamento
    }
  }`,
  latestPaymentInfoQueryName,
];

const vouchersListQueryName = 'getUsableVoucherListByUser';

export const getUsableVoucherListByUser = [
  '',
  `query ${vouchersListQueryName}($idRichiesta: Int!){
    ${vouchersListQueryName}(idRichiesta: $idRichiesta){
      code,
      cfMinore,
      idVoucher,
      remainingImport,
      endValidity
    }
  }`,
  vouchersListQueryName,
];

const updateTimeStampQueryName = 'setVoucherTimestamp';

export const setVoucherTimestamp = [
  '',
  `mutation ${updateTimeStampQueryName}($idRichiesta: Int!){
  ${updateTimeStampQueryName}(idRichiesta: $idRichiesta){
    lastUseTimeStamp
  }
  }`,
  updateTimeStampQueryName,
];

const merchantQueryName = 'getValidDataMerchant';

export const getValidDataMerchant = [
  '',
  `query ${merchantQueryName}($id_ente: Int!){
    ${merchantQueryName}(id_ente: $id_ente){
      merchantId
    }
  }`,
  merchantQueryName,
];
