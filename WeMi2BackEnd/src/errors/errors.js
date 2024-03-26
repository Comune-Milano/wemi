export const CLOSE_CHAT_ERROR = {
  code: 1001,
  message: 'Chat chiusa.',
};

export const DELETE_ATTACHMENT_ERROR = {
  code: 1002,
  message: 'Errore nella cancellazione del file',
};

export const PAYMENT_PROVIDER_TOKEN_ERROR = {
  code: 1004,
  message: 'Payment provider - Errore nella creazione del token di autenticazione.',
};

export const PAYMENT_PROVIDER_FAILED_TRANSACTION = {
  code: 1005,
  message: 'Payment provider - Errore nella esecuzione della transazione.',
};

export const PAYMENT_PROVIDER_NOT_PURCHASABLE_REQUEST = {
  code: 1006,
  message: 'Payment provider - La richiesta specificata non è acquistabile.',
};

export const PG_BENEFICIARY_ALREADY_EXISTS_ERROR = {
  code: 1007,
  message: 'Progressivo beneficiario già presente.',
};

export const REQUEST_TCB_INSERT_FAIL = {
  code: 1008,
  message: 'Errore inserimento richiesta TCB.',
};

export const STEP_NOT_SAVED_ERROR = {
  code: 1009,
  message: 'Step non salvato.',
};

export const RESOURCE_NOT_FOUND = {
  code: 1012,
  message: 'Risorsa non trovata',
};

export const SEND_EMAIL_ERROR = {
  code: 1014,
  message: 'Errore inoltro email.',
};

export const VALIDATION_ERROR = {
  code: 1015,
  message: 'Errore di validazione',
};

export const MULTIPLE_VALIDATION_ERROR = {
  code: 1016,
  message: 'Errore di validazione',
};

export const GENERATE_PDF_ERROR = {
  code: 1017,
  message: 'Errore nella generazione del pdf.',
};

export const NOT_BLOCKING_SEND_EMAIL_ERROR = {
  code: 1018,
  message: 'I dati sono stati aggiornati ma è stato riscontrato un errore nell\'inoltro della mail.',
};

export const WORKER_EVALUATION_REQUEST_BACKOFFICE_TCB = {
  code: 1019,
  message: 'Richiesta di valutazione non inoltrata, ci sono recensioni ancora da confermare',
};

export const FEEDBACK_REQUEST_ERROR = {
  code: 1020,
  message: 'Feedback già richiesto.',
};

export const FIND_USER_ERROR = {
  code: 1021,
  message: 'Si è verificato un errore nel recuperare i dati utente',
};

export const ASSOCIA_LAVORATORE_ERROR = {
  code: 2004,
  message: 'Errore in fase di associazione del lavoratore.',
};

export const CONTENT_MEDIA_PK_ID_ERROR = {
  code: 2013,
  message: 'ID non valido in input.',
};

export const ANNULLA_VOUCHER_ERROR = {
  code: 2098,
  message: 'Si sono verificati degli errori durante l\'operazione sul voucher. Contattare gli amministratori del Sistema.',
};

export const RIPRISTINO_VOUCHER_ERROR = {
  code: 2099,
  message: 'Si sono verificati degli errori durante l\'operazione sul voucher. Contattare gli amministratori del Sistema.',
};

export const INSERT_TRANSACTION_ERROR = {
  code: 3000,
  message: 'Si sono verificati degli errori durante l\'inserimento della transazione voucher. Contattare gli amministratori del Sistema.',
};

export const TIMESTAMP_VOUCHER_ERROR = {
  code: 3001,
  message: 'Risulta in corso un altro pagamento che utilizza lo stesso voucher, la transazione è annullata, la pagina sarà aggiornata',
};

export const CONTABILIZZA_TRANSAZIONE_VOUCHER_ERROR = {
  code: 2100,
  message: `Si sono verificati degli errori durante l'operazione sulla transazione. Contattare gli amministratori del Sistema.`,
};

export const STORNA_TRANSAZIONE_VOUCHER_ERROR = {
  code: 2101,
  message: `Si sono verificati degli errori durante l'operazione sulla transazione. Contattare gli amministratori del Sistema.`,
};

export const ELABORA_IMPORTAZIONE_VOUCHER_ERROR = {
  code: 2102,
  message: `Si sono verificati degli errori durante l'importazione dei voucher (elaborazione). Contattare gli amministratori del Sistema.`,
};

export const CONFERMA_IMPORTAZIONE_VOUCHER_ERROR = {
  code: 2103,
  message: `Si sono verificati degli errori durante l'importazione dei voucher (conferma importazione). Contattare gli amministratori del Sistema.`,
};
