
import { ApolloError} from 'apollo-server';
import {
  PAYMENT_PROVIDER_FAILED_TRANSACTION,
  PAYMENT_PROVIDER_NOT_PURCHASABLE_REQUEST,
} from '../../errors/errors';
import { ManagerRichiestaEnte } from '../richiestaservizioente/ManagerRichiestaEnte';
import { PagamentoDAO } from '../../dao/pagamento/PagamentoDAO';
import { 
  PAGAMENTO_ESEGUITO, 
} from '../pagamento/constants/StatoPagamento';
import { transformPaymentBilling } from './utils/billingTransformer';
import { selectPaymentIdentificationBoundary } from './queries/queries';
import { TEMPLATE_PAYMENT_TRANSACTION_CITTADINO, TEMPLATE_PAYMENT_TRANSACTION_ENTE } from 'constants/templates/database_template';
import { EMAIL_TYPE } from 'constants/templates/type_email';
import { SingletonFactoryEmail } from 'utility/email/factoryemail';
import { PAGE_REQUESTSINDEX_URL } from 'constants/router/url';

export default {
  Mutation: {
    createPaymentFree: async (parent, args, context) => {
      const {
        identificationBoundary,
        billing,
      } = args;
      
      const { idRichiestaEnte, needsEmailBill } = identificationBoundary;

      const { idUtenteRichiedente: idUtente } = await context.db.one(
        selectPaymentIdentificationBoundary, 
        { idRichiestaEnte }
      );


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

  

      /**
       * --- STEP 2 ---
       * AND
       * --- STEP 3 ---
       */
      try{
        const resultPayment = await context.db.tx('insert-pagamento', async transaction => {
          const pagamentoDAO = new PagamentoDAO(transaction);
  
          /**
           * --- STEP 2 ---
           * Store payment and billing info.
           */
          const jsDatiFatturazione = transformPaymentBilling(billing);
  
          // Payment data to store.
          const jsDatiPagamento = null;
  
          // Insert payment.
          const patchPaymentResult = await pagamentoDAO.insertPagamento({
            jsDatiFatturazione,
            jsDatiPagamento,
          });
  
          // Insert payment stt.
          await pagamentoDAO.insertPagamentoStt({
            idInternoTransazionePagamento: patchPaymentResult.idInternoTransazionePagamento,
            cdStatoPagamento: PAGAMENTO_ESEGUITO,
            idUtente,
          });
  
          /**
           * --- STEP 3 ---
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

      /**
       * STEP 4 - If necessary send an email
       */
        if(needsEmailBill){
        /**
         * TODO SendEmail with bill information to the user
         */
        }

        return resultPayment;
      }
      catch(error){
        context.logger.error(error);
        throw new ApolloError(PAYMENT_PROVIDER_FAILED_TRANSACTION.message, PAYMENT_PROVIDER_FAILED_TRANSACTION.code);
      }

     
      
    },  
  },
};