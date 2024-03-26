
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PaymentErrorBoundary } from 'libs/BraintreePayment/errors/PaymentErrorBoundary';
import { isBackendError } from 'errors/api/definitions/BackendError';
import { isPaymentProviderError as isPaymentProviderClientError } from 'libs/BraintreePayment/errors/PaymentProviderError';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import {
  PAYMENT_PROVIDER_FAILED_DB_TRACKING_FAILED_TRANSACTION,
  PAYMENT_PROVIDER_FAILED_DB_TRACKING_SUCCESSFULL_TRANSACTION,
  PAYMENT_PROVIDER_FAILED_TRANSACTION,
  PAYMENT_PROVIDER_NOT_PURCHASABLE_REQUEST,
  PAYMENT_PROVIDER_TOKEN_ERROR,
  TIMESTAMP_VOUCHER_ERROR,
} from 'errors/api/codes/graphql-codes';
import {
  PAYMENT_PROVIDER_INIT_ERROR_CODE,
  PAYMENT_METHOD_NONCE_ERROR_CODE,
  TRANSACTION_ERROR_CODE,
} from 'errors/client/codes/codes';
import { getDisplayName as getComponentDisplayName } from 'utils/functions/getComponentName';
import { PAGE_REQUESTSINDEX_URL } from 'types/url';
import {
  withRouter,
  generatePath,
} from 'react-router-dom';
import { PaymentErrorModal } from '../partials/Modals/PaymentErrorModal/PaymentErrorModal';

/**
 * Map the error code to the error modal data to be shown.
 */
const errorModalByCode = {
  [PAYMENT_PROVIDER_FAILED_TRANSACTION]: {
    title: 'Errore pagamento',
    errorMessage: `
      Si è verificato un errore in fase di esecuzione della transazione.
      Controlla che il metodo di pagamento selezionato e i relativi dati siano corretti.
    `,
    revertable: true,
  },
  [PAYMENT_PROVIDER_NOT_PURCHASABLE_REQUEST]: {
    title: 'Errore pagamento',
    errorMessage: `
      Non è stato possibile completare l'operazione richiesta in quanto il servizio risulta non più acquistabile.
      Controlla l'indice delle richieste per maggiori informazioni.
    `,
    revertable: false,
  },
  [PAYMENT_PROVIDER_TOKEN_ERROR]: {
    title: 'Errore di inizializzazione',
    errorMessage: `
      Non è stato possibile recuperare il token di pagamento.
      Assicurati che l'ente sia abilitato a ricevere pagamenti in ingresso. 
    `,
    revertable: false,
  },
  [PAYMENT_PROVIDER_INIT_ERROR_CODE]: {
    title: 'Errore di inizializzazione',
    errorMessage: `
      Si è verificato un errore inatteso in fase di inizializzazione del form di pagamento.
      Prova a ripetere la procedura di acquisto.
    `,
    revertable: false,
  },
  [PAYMENT_METHOD_NONCE_ERROR_CODE]: {
    title: 'Errore metodo di pagamento',
    errorMessage: `
      Si è verificato un errore inatteso in fase di selezione del metodo di pagamento.
    `,
    revertable: true,
  },
  [TRANSACTION_ERROR_CODE]: {
    title: 'Errore pagamento',
    errorMessage: `
      Si è verificato un errore inatteso in fase di creazione della transazione di pagamento.
      Assicurati che l'acquisto non sia andato a buon fine prima di procedere nuovamente nella procedura.
    `,
    revertable: false,
  },
  [PAYMENT_PROVIDER_FAILED_DB_TRACKING_SUCCESSFULL_TRANSACTION]: {
    title: 'Errore',
    errorMessage: 'Il pagamento è andato a buon fine, ma non è stato possibile salvare i dati relativi alla transazione.',
    revertable: false,
  },
  [PAYMENT_PROVIDER_FAILED_DB_TRACKING_FAILED_TRANSACTION]: {
    title: 'Errore',
    errorMessage: 'La transazione è fallita e non è stato possibile salvare i dati relativi alla transazione.',
    revertable: true,
  },
  [TIMESTAMP_VOUCHER_ERROR]: {
    title: 'Errore',
    errorMessage: 'Risulta in corso un altro pagamento che utilizza lo stesso voucher, la transazione è annullata, la pagina sarà aggiornata',
    revertable: false,
  },

};

/**
 * An hoc handling any error in the purchase flow.
 */
export const withPaymentErrorHandler = WrappedComponent => {
  const mapStoreToProps = store => ({
    locale: store.locale,
  });

  const EnhancedComponent = props => {
    const { locale, history } = props;

    // The state of the error.
    const [errorState, setErrorState] = useState({
      visible: false,
      code: undefined,
      // Keeping track of the original error.
      error: undefined,
    });

    /**
     * Changes the visibility of the error modal.
     * @param {*} visible
     */
    const changeModalVisibility = (visible, revertable) => {
      setErrorState({
        ...errorState,
        visible,
      });

      if (!visible && !revertable) {
        history.push(generatePath(PAGE_REQUESTSINDEX_URL, { locale }));
      }
    };

    /**
     * Handles an error from the payment flow.
     * @param {*} error
     */
    const handleError = error => {
      // The error code, if any.
      let code;

      // Client error.
      if (isPaymentProviderClientError(error)) {
        const { code: clientCode } = error;
        code = clientCode;
      }

      // Backend error.
      if (isBackendError(error)) {
        code = getObjectValue(error, 'graphQLErrors', []) // Gets the set of errors linked to the provided GraphQLError.
          .reduce((accumulator, graphQLError) => {
            const graphQLErrorCode = getObjectValue(graphQLError, 'code', []);

            return graphQLErrorCode && !accumulator ? graphQLErrorCode : accumulator;
          }, undefined);
      }

      // Update error state.
      setErrorState({
        visible: true,
        code: code || undefined,
        error,
      });
    };

    const modalByCode = errorModalByCode[errorState.code];
    if (modalByCode) {
      const { title, errorMessage, revertable } = modalByCode;

      return (
        <PaymentErrorBoundary>
          <PaymentErrorModal
            title={title}
            errorMessage={errorMessage}
            modalVisible={errorState.visible}
            setModalVisible={visible => changeModalVisibility(visible, revertable)}
          />
          <WrappedComponent
            paymentError={errorState}
            handlePaymentError={handleError}
            {...props}
          />
        </PaymentErrorBoundary>
      );
    }

    return (
      <PaymentErrorBoundary>
        <PaymentErrorModal
          title="Errore inatteso"
          errorMessage={`
            Si è verificato un errore inatteso.
            Prima di ripetere la procedura d'acquisto verifica che la richiesta risulti ancora aperta e che la transazione non sia stata processata.
          `}
          modalVisible={errorState.visible}
          setModalVisible={visible => changeModalVisibility(visible, false)}
        />
        <WrappedComponent
          paymentError={errorState}
          handlePaymentError={handleError}
          {...props}
        />
      </PaymentErrorBoundary>
    );
  };

  // The display name is derived from the wrapped component name :)
  const wrappedComponentName = getComponentDisplayName(WrappedComponent);
  EnhancedComponent.displayName = `withPaymentErrorHandler (${wrappedComponentName})`;

  return connect(mapStoreToProps)(
    withRouter(EnhancedComponent)
  );
};


// const withPaymentErrorHandlerConnected =

// export default withPaymentErrorHandlerConnected;
