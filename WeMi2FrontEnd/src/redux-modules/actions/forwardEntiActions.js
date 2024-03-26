import {
  FORWARD_SELECTED_ENTI,
  REMOVE_SELECTED_ENTI,
  ADD_LISTINI_PREZZI,
  CALCOLA_PREZZO,
} from 'types/actions';

export function forwardSelectedEnti(
  enti,
  qtPersone,
  qtUnita,
  indirizzo,
  destinatari,
  mansioni,
  momentiGiornata,
) {
  return {
    type: FORWARD_SELECTED_ENTI,
    enti,
    qtPersone,
    qtUnita,
    indirizzo,
    destinatari,
    mansioni,
    momentiGiornata,
  }
}

export function removeSelectedEnte(idServizioEnte) {
  return {
    type: REMOVE_SELECTED_ENTI,
    idServizioEnte,
  }
}

export function addListiniPrezzi(listiniPrezzi, qtPersone, qtQuantita) {
  return {
    type: ADD_LISTINI_PREZZI,
    listiniPrezzi,
    qtPersone,
    qtQuantita,
  }
}

export function calcolaPrezzo(qtPersone, qtUnita) {
  return {
    type: CALCOLA_PREZZO,
    qtPersone,
    qtUnita,
  }
}