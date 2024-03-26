import {
  PAYMENT_PROVIDER_INIT_ERROR_CODE,
  PAYMENT_METHOD_NONCE_ERROR_CODE,
  TRANSACTION_ERROR_CODE,
} from '../codes/codes';

// TODO: Each error should have a flag telling if it should be
// handled by the error manager or streammed up to the ui (local handling).

export const CLIENT_ERROR_VISUALIZATION_MAP = new Map([
  [PAYMENT_PROVIDER_INIT_ERROR_CODE, {
    message: `
      Si è verificato un errore inatteso in fase di inizializzazione del form di pagamento.
      Prova a ripetere la procedura di acquisto.
    `,
    title: 'Errore di inizializzazione',
    fatal: false,
    showSendReport: true,
  }],
  [PAYMENT_METHOD_NONCE_ERROR_CODE, {
    message: `
      Si è verificato un errore inatteso in fase di selezione del metodo di pagamento.
    `,
    title: 'Errore metodo di pagamento',
    fatal: false,
    showSendReport: true,
  }],
  [TRANSACTION_ERROR_CODE, {
    message: `
      Si è verificato un errore inatteso in fase di creazione della transazione di pagamento.
      Assicurati che l'acquisto non sia andato a buon fine prima di procedere nuovamente nella procedura.
    `,
    title: 'Errore pagamento',
    fatal: false,
    showSendReport: true,
  }],
]);
