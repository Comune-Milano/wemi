/** @format */

import { gql } from 'apollo-server-express';
import { CITTADINO, LAVORATORE } from 'constants/usercode';
import { ENUM_VALIDATOR } from 'constants/authorization/validator';

export default gql`
  input ThreeDSecureTransactionOption {
    required: Boolean!
  }

  input TransactionPayload {
    amount: String!
    paymentMethodNonce: TransactionNonce
  }

  input TransactionNonce {
    nonce: String!
    type: String!
    deviceData: String!
  }

  input TransactionBilling {
    name: String!
    surname: String!
    address: String!
    postalCode: String!
    province: String!
    region: String!
    phoneNumber: String!
    notes: String
    fiscalCode: String
    businessName: String
    vatNumber: String
    isCitizen: Boolean!
    receiveInvoce: Boolean!
  }

  input TransactionVoucherBilling {
    name: String!
    surname: String!
    address: String!
    postalCode: String!
    province: String!
    region: String!
    phoneNumber: String!
    notes: String
    fiscalCode: String
    isCitizen: Boolean!
    receiveInvoce: Boolean!
  }

  input TransactionIdentificationBoundary {
    idRichiestaEnte: Int!
    idInternoTransazionePagamento: Int
    needsEmailBill: Boolean
  }

  type TransactionResult {
    success: Boolean!
    internalTransactionId: Int!
  }

  input TransactionVoucher {
    idVoucher: Int!
    idRichiesta: Int!
    imSpeso: Float!
    nmEnte: String!
    jsonDescrServizio: JSON!
    lastUseTimeStamp: Timestamp!
  }

  extend type Mutation {
    createPaymentTransaction (
      identificationBoundary: TransactionIdentificationBoundary!,
      transactionPayload: TransactionPayload!,
      billing: TransactionBilling!,
      transactionVouchers: [TransactionVoucher],
      totalVoucherImport: Float
    ): TransactionResult! @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "identificationBoundary.idRichiestaEnte")

    createVoucherTransaction (
      identificationBoundary: TransactionIdentificationBoundary!,
      billing: TransactionVoucherBilling!,
      transactionVouchers: [TransactionVoucher]!,
      totalVoucherImport: Float!
    ): TransactionResult! @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "identificationBoundary.idRichiestaEnte")

    otherPaymentMethodTransaction(
      identificationBoundary: TransactionIdentificationBoundary!,
      billing: TransactionVoucherBilling!,
      transactionVouchers: [TransactionVoucher],
      totalVoucherImport: Float
    ): TransactionResult! @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "identificationBoundary.idRichiestaEnte")

    createPaymentFree(
      identificationBoundary: TransactionIdentificationBoundary!,
      billing: TransactionBilling!
    ): TransactionResult @auth @protect(roles: [${CITTADINO},${LAVORATORE}]) @validate(type: ${ENUM_VALIDATOR.RICHIESTA_ENTE.code}, argsKey: "identificationBoundary.idRichiestaEnte")
  }
`;