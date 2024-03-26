/**
 * Error codes for authorization
 */

export const UNAUTHORIZED = {
  code: 1200,
  message: 'Non autorizzato.',
};

export const ACCESS_DENIED = {
  code: 1201,
  message: 'Accesso negato.',
};

export const UNAUTHENTICATED = {
  code: 1202,
  message: 'Non autenticato.',
};

export const VALIDATOR_UNDEFINED = {
  code: 1203,
  message: 'Validatore non definito.',
};

export const ROLES_UNDEFINED = {
  code: 1204,
  message: 'Ruoli non definiti.',
};

export const DELETE_AUTHORIZATION_ERROR = {
  code: 1210,
  message: 'Impossibile eliminare questa autorizzazione',
};

export const INSERT_AUTHORIZATION_ERROR = {
  code: 1211,
  message: 'impossibile aggiungere questa autorizzazione',
};

export const UTENTE_NON_VALIDO = {
  code: 1212,
  message: 'Il profilo dell\'utente non è valido',
};

export const UTENTE_NON_RICONOSCIUTO = {
  code: 1213,
  message: 'Username o password non validi',
};