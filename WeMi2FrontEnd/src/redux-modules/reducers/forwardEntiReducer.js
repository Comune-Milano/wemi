import {
  FORWARD_SELECTED_ENTI,
  REMOVE_SELECTED_ENTI,
  ADD_LISTINI_PREZZI,
  CALCOLA_PREZZO,

} from 'types/actions';

export default function forwardEntiReducer(state = {}, action = {}) {
  switch (action.type) {
    case FORWARD_SELECTED_ENTI:
      return {
        ...state,
        entiSelezionati: action.enti,
        qtUnita: action.qtUnita,
        qtPersone: action.qtPersone,
        indirizzo: action.indirizzo,
        destinatari: action.destinatari,
        mansioni: action.mansioni,
        momentiGiornata: action.momentiGiornata,
      };
    case REMOVE_SELECTED_ENTI:
      const newEnti = state.entiSelezionati
        .filter(ente => ente.idServizioEnte !== action.idServizioEnte);
      return {
        ...state,
        entiSelezionati: newEnti,
      };
    case ADD_LISTINI_PREZZI:
      if(!state.entiSelezionati) {
        return {
          ...state,
        };
      }
      const entiConListino = state.entiSelezionati
       .map(ente => {
         const listinoPrezzi = action.listiniPrezzi.find(listino => (
          ente.idServizioEnte === listino.idServizioEnte
        ));
         return {
         ...ente,
         listinoPrezzi,
         prezzoCalcolato: calcola(listinoPrezzi, action.qtPersone || 1, action.qtQuantita || 1),
       }});
      return {
        ...state,
        entiSelezionati: entiConListino,
      };
    case CALCOLA_PREZZO:
      return {
        ...state,
        entiSelezionati: state.entiSelezionati.map(calcolaPrezzi(action.qtPersone, action.qtUnita)),
      };
    default: return state;
  }
}

const calcolaPrezzi = (qtPersone, qtUnita) => (
  ente => ({
    ...ente,
    prezzoCalcolato: calcola(ente.listinoPrezzi, qtPersone, qtUnita),
  })
)

const calcola = (listinoPrezzi, persone, quantita) => {
  if ([1, 2].indexOf(listinoPrezzi.cdTipoOffertaServizio) >= 0) {
    return 0;
  }
  if (isInteger(persone) && isInteger(quantita) && quantita >= listinoPrezzi.qtMinimaUnita) {
    const offPersone = listinoPrezzi.listinoPrezzi.find(el => 
      el.qtPersoneDa <= persone && el.qtPersoneA >= persone
      );
    if (offPersone) {
      const offQuantita = offPersone.offerta.find(el =>
        el.qtUnitaDa <= quantita && (el.qtUnitaA || Number.POSITIVE_INFINITY) >= quantita
        );
      if (offQuantita) {
        return phpRound(offQuantita.valore * quantita);
      } 
    }
  }
  return null;
};

const isInteger = value => parseInt(value, 10) == value && value > 0;

const phpRound = (value, precision=2) => {
  const factor = Math.pow(10, precision);
  const tempNumber = value * factor;
  const [ integer, decimals ] = `${Math.abs(tempNumber)}`.split('.');
  if (!!decimals && Number.parseFloat(`0.${decimals}`).toFixed(1) === '0.5') {
    return (Number.parseInt(integer, 10) + (value < 0 ? -1 : 1)) / factor;
  }
  const roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
};
