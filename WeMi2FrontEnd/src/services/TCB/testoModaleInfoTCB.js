import { HIRING_TYPE_TCB } from 'components/navigation/RichiestaServizioTCB/constants';

/**
 * la funzione restituisce il testo per la modale info a seconda della tipologia di acquisto
 */
export const testoPerModaleInfoTCB = domain => {
  if (domain === HIRING_TYPE_TCB.DIRECT) {
    return 'Il datore di lavoro e il lavoratore sottoscrivono un contratto di lavoro, che comporta diritti e doveri per entrambi, elencati nella lettera di assunzione. Il rapporto di lavoro per essere effettivo deve essere comunicato all’INPS.';
  }
  if (domain === HIRING_TYPE_TCB.INSTITUTION) {
    return 'L\'assistente familiare non viene assunta dalla famiglia, ma da un ente del terzo settore, che si fa carico della gestione del rapporto di lavoro.';
  }
  if (domain === HIRING_TYPE_TCB.FAMILY_BOOKLET) {
    return 'È utilizzata per regolarizzare un assistente familiare che svolge prestazioni di lavoro occasionale, per un massimo di 280 ore annue. Esso è composto da titoli di pagamento del valore di 10 euro all\'ora per un importo che non deve superare i 5.000,00 € all\'anno. Per accedervi è necessario che sia il datore di lavoro sia il lavoratore siano registrati sul portale dell\'INPS.';
  }
  return '';
};
