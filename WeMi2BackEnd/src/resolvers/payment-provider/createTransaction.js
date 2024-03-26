
import { ApolloError } from 'apollo-server';
import {
  PAYMENT_PROVIDER_FAILED_TRANSACTION,
  PAYMENT_PROVIDER_NOT_PURCHASABLE_REQUEST,
  TIMESTAMP_VOUCHER_ERROR,
} from '../../errors/errors';
import { ManagerRichiestaEnte } from '../richiestaservizioente/ManagerRichiestaEnte';
import { PagamentoDAO } from '../../dao/pagamento/PagamentoDAO';
import {
  PAGAMENTO_ESEGUITO,
  PAGAMENTO_FALLITO,
} from '../pagamento/constants/StatoPagamento';
import { BraintreeGatewayFactory } from './factory/PaymentProviderFactory';
import { transformPaymentBilling } from './utils/billingTransformer';
import { transformPaymentData } from './utils/paymentDataTransformer';
import { selectPaymentIdentificationBoundary } from './queries/queries';
import {
  TEMPLATE_PAYMENT_TRANSACTION_CITTADINO,
  TEMPLATE_PAYMENT_TRANSACTION_ENTE,
} from 'constants/templates/database_template';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { PAGE_REQUESTSINDEX_URL } from 'constants/router/url';
import {
  PAYMENT_PROVIDER_FAILED_DB_TRACKING_FAILED_TRANSACTION,
  PAYMENT_PROVIDER_FAILED_DB_TRACKING_SUCCESSFULL_TRANSACTION,
} from 'errors/pagamento';
import { VoucherDomain } from 'domain/voucher/voucher';
import { selectTimeStamps } from 'sql/voucher/selezione';

export default {
  Mutation: {
    createPaymentTransaction: async (parent, args, context) => {
      const {
        transactionPayload,
        identificationBoundary,
        billing,
        transactionVouchers,
        totalVoucherImport,
      } = args;
      const {
        idRichiestaEnte,
        idInternoTransazionePagamento,
      } = identificationBoundary;

      const { idEnte, idUtenteRichiedente: idUtente } = await context.db.one(
        selectPaymentIdentificationBoundary,
        { idRichiestaEnte }
      );

      const nextIdPagamento = await context.db.one('SELECT nextVal(\'wemi2.seq_pagamento\')');
      const idInternoTrans = idInternoTransazionePagamento || (nextIdPagamento && nextIdPagamento.nextval);

      /**
       * --- STEP 1 ---
       * Check if the request can be purhcased.
       */
      try {
        const requestManager = new ManagerRichiestaEnte(context, idRichiestaEnte);
        const isRequestPurchasable = await requestManager.isRichiestaEnteAcquistabile();

        if (!isRequestPurchasable) {
          throw new Error('The request is not purchasable.');
        }
      } catch (error) {
        context.logger.error(
          error,
          'Payment provider - The request is not purchasable or there was an error while checking whether it is like so.'
        );

        const { message, code } = PAYMENT_PROVIDER_NOT_PURCHASABLE_REQUEST;
        throw new ApolloError(message, code);
      }

      const voucherDomain = new VoucherDomain({
        db: context.db,
        user: context.user,
        logger: context.logger,
        formatter: context.formatter.formatter,
        queryBuilder: context.queryBuilder,
        req: context.req,
      });

      if(transactionVouchers?.length){
        try {
          const idVouchers = transactionVouchers.map(voucher => voucher.idVoucher);
          const vouchersTimeStamp = transactionVouchers.find(voucher => voucher.lastUseTimeStamp).lastUseTimeStamp;
          const timeStamps = await context.db.any(selectTimeStamps, { idVouchers });
          timeStamps.forEach(value => {
            if(new Date(vouchersTimeStamp).getTime() !== new Date(value.ts_controllo_utilizzo).getTime()){
              throw new Error('The request is not purchasable.');
            }
          });
        }
        catch (error) {
          context.logger.error(
            error,
            'Payment provider - The request is not purchasable or there was an error while checking whether it is like so.'
          );
          const { message, code } = TIMESTAMP_VOUCHER_ERROR;
          throw new ApolloError(message, code);
        }
      }


      
        // Insert transactions voucher.
      if(transactionVouchers?.length){
        for (let i=0; i<transactionVouchers.length; i+=1) {
          await voucherDomain.insertVoucherTransaction(transactionVouchers[i], idInternoTrans);
        }
      }
     

      /**
       * --- STEP 2 ---
       * Performing the transaction.
       */
      let transactionResult;
      try {
        const paymentGateway = await BraintreeGatewayFactory.Create(context, idEnte);
        transactionResult = await paymentGateway.performSaleTransaction(transactionPayload);

        if (!transactionResult.success) {
          throw new Error(JSON.stringify(transactionResult));
        }
      } catch (error) {
        context.logger.error(
          error,
          'Payment provider - Error while executing the payment transaction.'
        );

        let patchPaymentResult;
        /**
         * Updates "payment" and "payment_stt" with the failed transaction data.
         */
        try {
          await context.db.tx('insert-pagamento', async transaction => {
            const pagamentoDAO = new PagamentoDAO(transaction);

            // Billing data to store.
            const jsDatiFatturazione = transformPaymentBilling(billing);

            // Takes payment data from request.
            const { paymentMethodNonce: { type: paymentType } } = transactionPayload;
            const { localtimestamp } = await transaction.one('SELECT localtimestamp');

            // Payment data to store.
            const jsDatiPagamento = transformPaymentData(null, localtimestamp, paymentType, totalVoucherImport);

            // Insert (or update) payment entry.
            patchPaymentResult = await pagamentoDAO.insertOrUpdatePagamento({
              jsDatiFatturazione,
              jsDatiPagamento,
              idInternoTrans,
            }, idInternoTransazionePagamento);

            // Insert stt payment.
            await pagamentoDAO.insertPagamentoStt({
              idInternoTransazionePagamento: patchPaymentResult.idInternoTransazionePagamento,
              cdStatoPagamento: PAGAMENTO_FALLITO,
              idUtente,
            });

            // Updates internal transaction id of the request.
            const requestManager = new ManagerRichiestaEnte({ db: transaction }, idRichiestaEnte);
            await requestManager.updateIdTransazionePagamento(patchPaymentResult.idInternoTransazionePagamento);

            //updates voucher transactions
            const voucherD = new VoucherDomain({
              db: transaction,
              user: context.user,
              logger: context.logger,
              formatter: context.formatter.formatter,
              queryBuilder: context.queryBuilder,
              req: context.req,
            });

            if(transactionVouchers?.length){
              const { idUtente } = context.user;
              await voucherD.divertVoucherTransaction(idInternoTrans, idUtente);
            }
          });
        }
        catch (errorDb) {
          throw new ApolloError(PAYMENT_PROVIDER_FAILED_DB_TRACKING_FAILED_TRANSACTION.message, PAYMENT_PROVIDER_FAILED_DB_TRACKING_FAILED_TRANSACTION.code);
        }

        // Throw an error to communicate that the transaction failed.
        // Provides the internal transaction id to the client, so we
        // can patch (update) the exisisting payment when a new transaction
        // is requested.
        const { message, code } = PAYMENT_PROVIDER_FAILED_TRANSACTION;
        throw new ApolloError(
          message,
          code,
          { data: { internalTransactionId: patchPaymentResult.idInternoTransazionePagamento } }
        );

      }

      let resultPayment;
      /**
       * --- STEP 3 ---
       * AND
       * --- STEP 4 ---
       */
      try {
        resultPayment = await context.db.tx('insert-pagamento', async transaction => {
          const pagamentoDAO = new PagamentoDAO(transaction);

          /**
           * --- STEP 3 ---
           * Store payment and billing info.
           */
          const jsDatiFatturazione = transformPaymentBilling(billing);

          // Takes payment data from request.
          const { paymentMethodNonce: { type: paymentType } } = transactionPayload;
          const { transaction: { id: transactionId } } = transactionResult;
          const { localtimestamp } = await transaction.one('SELECT localtimestamp');

          // Payment data to store.
          const jsDatiPagamento = transformPaymentData(transactionId, localtimestamp, paymentType, totalVoucherImport);

          // Insert payment.
          const patchPaymentResult = await pagamentoDAO.insertOrUpdatePagamento({
            jsDatiFatturazione,
            jsDatiPagamento,
            idInternoTrans,
          }, idInternoTransazionePagamento);

          // Insert payment stt.
          await pagamentoDAO.insertPagamentoStt({
            idInternoTransazionePagamento: patchPaymentResult.idInternoTransazionePagamento,
            cdStatoPagamento: PAGAMENTO_ESEGUITO,
            idUtente,
          });

          /**
           * --- STEP 4 ---
           * Sets the request as paid.
           */
          const requestManager = new ManagerRichiestaEnte({ db: transaction, user: context.user }, idRichiestaEnte);
          await requestManager.setRichiestaEnteAsPagata();
          await requestManager.updateIdTransazionePagamento(patchPaymentResult.idInternoTransazionePagamento);

          // Just return a success with the internal transaction id.
          return {
            success: true,
            internalTransactionId: patchPaymentResult.idInternoTransazionePagamento,
          };
        });
      }
      catch (error) {
        throw new ApolloError(PAYMENT_PROVIDER_FAILED_DB_TRACKING_SUCCESSFULL_TRANSACTION.message, PAYMENT_PROVIDER_FAILED_DB_TRACKING_SUCCESSFULL_TRANSACTION.code);
      }
      return resultPayment;
    },
  },
};