import { NETWORK_CODES } from '../codes/network-codes';

// TODO: Each error should have a flag telling if it should be
// handled by the error manager or streammed up to the ui (local handling).

export const NETWORK_ERROR_VISUALIZATION_MAP = new Map([
  [NETWORK_CODES.BAD_REQUEST, {
    message: 'La richiesta presenta errori di sintassi.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.UNAUTHORIZED, {
    message: 'L\'operazione richiede autenticazione.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.FORBIDDEN, {
    message: 'L\'utente loggato non dispone dei diritti necessari a completare l\'operazione.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.NOT_FOUND, {
    message: 'Non è stato possibile recuperare la risorsa richiesta.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.METHOD_NOT_ALLOWED, {
    message: 'Il metodo utilizzato per effettuare l\'operazione risulta non supportato.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.REQUEST_TIMEOUT, {
    message: 'Il server ha impiegato troppo tempo a rispondere.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.PAYLOAD_TOO_LARGE, {
    message: 'La richiesta non può essere processata in quanto supera i limiti imposti dal server.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.URI_TOO_LONG, {
    message: 'L\'URI richiesto è troppo grande per essere elaborato dal server.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.UNSUPPORTED_MEDIA_TYPE, {
    message: 'L\'entità della richiesta è di un tipo non accettato dal server.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.TOO_MANY_REQUESTS, {
    message: 'La frequenza delle richieste risulta più elevata dei limiti imposti dal server.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.INTERNAL_SERVER_ERROR, {
    message: 'Si è verificato un errore di rete inatteso.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.METHOD_NOT_IMPLEMENTED, {
    message: 'Il server non è in grande di soddisfare il metodo della richiesta.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.BAD_GATEWAY, {
    message: 'Risposta invalida dal gateway.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.SERVICE_UNAVAILABLE, {
    message: 'Il servizio è attualmente non disponibile.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
  [NETWORK_CODES.GATEWAY_TIMEOUT, {
    message: 'Il gateway è andato in timeout.',
    title: 'Errore di rete',
    fatal: false,
    showSendReport: true,
  }],
]);
