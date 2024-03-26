import {
    entityType as orderEntityTypes,
  } from '../../../context/ServiceOrderContext';

export const inputProcessPayment = (dataset,
    amountToPay,
    nonce,
    type,
    deviceData,
    internalTransactionIdRef,
    infoRichiestaEnte,
    entityType,
    paymentWithVoucher) => {
  if (paymentWithVoucher) {
    return (
    {
      transactionPayload: {
        amount: `${amountToPay}`,
        paymentMethodNonce: { nonce, type, deviceData },
      },
      identificationBoundary: {
        idRichiestaEnte: infoRichiestaEnte.idRichiestaServizioEnte,
        idInternoTransazionePagamento: internalTransactionIdRef.current,
      },
      billing: {
        name: dataset.name,
        surname: dataset.surname,
        address: dataset.address,
        postalCode: dataset.postalCode,
        province: dataset.province,
        region: dataset.region,
        phoneNumber: dataset.phoneNumber,
        notes: dataset.notes,
        fiscalCode: dataset.fiscalCode,
        businessName: dataset.businessName,
        vatNumber: dataset.vatNumber,
        receiveInvoce: dataset.receiveInvoce,
        isCitizen: entityType === orderEntityTypes.CITIZEN,
      },
      transactionVouchers: dataset.selectedVouchers.map(voucher => ({
        idVoucher: voucher.id,
        idRichiesta: infoRichiestaEnte.idRichiestaServizioEnte,
        imSpeso: voucher.voucherShare,
        nmEnte: infoRichiestaEnte.nomeEnteCompleto,
        jsonDescrServizio: infoRichiestaEnte.nomeServizioEnte,
        lastUseTimeStamp: voucher.lastUseTimeStamp,
      })),
      totalVoucherImport: dataset.totalVoucherImport,
    });
  } return (
  {
    transactionPayload: {
      amount: `${amountToPay}`,
      paymentMethodNonce: { nonce, type, deviceData },
    },
    identificationBoundary: {
      idRichiestaEnte: infoRichiestaEnte.idRichiestaServizioEnte,
      idInternoTransazionePagamento: internalTransactionIdRef.current,
    },
    billing: {
      name: dataset.name,
      surname: dataset.surname,
      address: dataset.address,
      postalCode: dataset.postalCode,
      province: dataset.province,
      region: dataset.region,
      phoneNumber: dataset.phoneNumber,
      notes: dataset.notes,
      fiscalCode: dataset.fiscalCode,
      businessName: dataset.businessName,
      vatNumber: dataset.vatNumber,
      receiveInvoce: dataset.receiveInvoce,
      isCitizen: entityType === orderEntityTypes.CITIZEN,
    } }
  );
};

export const inputVoucherOrOtherMethodPayment = (dataset,
  internalTransactionIdRef,
  infoRichiestaEnte,
  entityType,
  paymentWithVoucher) => {
  if (paymentWithVoucher) {
    return ({
      identificationBoundary: {
        idRichiestaEnte: infoRichiestaEnte.idRichiestaServizioEnte,
        idInternoTransazionePagamento: internalTransactionIdRef.current,
      },
      billing: {
        name: dataset.name,
        surname: dataset.surname,
        address: dataset.address,
        postalCode: dataset.postalCode,
        province: dataset.province,
        region: dataset.region,
        phoneNumber: dataset.phoneNumber,
        fiscalCode: dataset.fiscalCode,
        receiveInvoce: dataset.receiveInvoce,
        notes: dataset.notes,
        isCitizen: entityType === orderEntityTypes.CITIZEN },
      transactionVouchers: dataset.selectedVouchers.map(voucher => ({
        idVoucher: voucher.id,
        idRichiesta: infoRichiestaEnte.idRichiestaServizioEnte,
        imSpeso: voucher.voucherShare,
        nmEnte: infoRichiestaEnte.nomeEnteCompleto,
        jsonDescrServizio: infoRichiestaEnte.nomeServizioEnte,
        lastUseTimeStamp: voucher.lastUseTimeStamp,
      })),
      totalVoucherImport: dataset.totalVoucherImport });
  } return ({
    identificationBoundary: {
      idRichiestaEnte: infoRichiestaEnte.idRichiestaServizioEnte,
      idInternoTransazionePagamento: internalTransactionIdRef.current,
    },
    billing: {
      name: dataset.name,
      surname: dataset.surname,
      address: dataset.address,
      postalCode: dataset.postalCode,
      province: dataset.province,
      region: dataset.region,
      phoneNumber: dataset.phoneNumber,
      fiscalCode: dataset.fiscalCode,
      receiveInvoce: dataset.receiveInvoce,
      notes: dataset.notes,
      isCitizen: entityType === orderEntityTypes.CITIZEN } });
};
