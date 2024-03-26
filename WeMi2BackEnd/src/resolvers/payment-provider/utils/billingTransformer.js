
/**
 * Trasnforms billing data coming as payload of the transaction request
 * into all those info that needs to be stored in the db.
 * @param {*} billingData
 */
export const transformPaymentBilling = (billingData) => ({
  flSocieta: billingData.isCitizen ? 'N' : 'S',
  txNome: billingData.name,
  txCognome: billingData.surname,
  txIndirizzo: billingData.address,
  txCAP: billingData.postalCode,
  txComune: billingData.region,
  txProvincia: billingData.province,
  txTel: billingData.phoneNumber,
  txCF: billingData.fiscalCode || null,
  txRagSoc: billingData.businessName || null,
  txPiva: billingData.vatNumber || null,
  txNote: billingData.notes || null,
  flEmail: billingData.receiveInvoce ? 'S' : 'N',
});