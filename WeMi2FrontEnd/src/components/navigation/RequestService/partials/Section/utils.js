import { isNullOrUndefined } from "util";
import moment from 'moment';
import { moneyFormat } from 'utils/formatters/moneyFormat';

export const calcPrezzoStimato = (
  tipoOfferta, 
  tipoServizio, 
  js, 
  min, 
  qPersone, 
  qPrestazione, 
  dtInizioValOfferta, 
  dtFineValOfferta,  
  ) => {
  let messaggioErrore = 'Non erogabile';
  let calc = '';

  if (!min || (tipoServizio === 1 && qPersone > 1)) {
    calc = messaggioErrore;
  } else {
    calc = '€ ' + moneyFormat(parseFloat(min) * (qPrestazione ? parseInt(qPrestazione) : 0));
    switch (tipoOfferta) {
      case 1:
        calc = 'Gratuito con finanziamento'
        break;
      case 2:
        calc = 'Gratuito su base volontaria'
        break;
      case 3:
        /** Controlla come gestisci le date. */
        if (!isNaN(parseInt(qPrestazione)) && (moment().isBetween(moment(dtInizioValOfferta), moment(dtFineValOfferta)))) {
          switch (tipoServizio) {
            case 1:
              if (js && !isNullOrUndefined(js.offertaApacchetto) &&
                (parseInt(qPrestazione) >= parseInt(js.offertaApacchetto.qtMinimaUnita))) {
                js.offertaApacchetto.listaPrezzi.forEach(lista => {
                  if ((parseInt(lista.numPersoneDa) <= parseInt(qPersone)) && (parseInt(qPersone) <= parseInt(lista.numPersoneA))) {
                    lista.offerta.forEach(unita => {
                      if (
                        (
                          (parseInt(unita.unitaDa) <= parseInt(qPrestazione)) &&
                          (parseInt(qPrestazione) <= parseInt(unita.unitaA))
                        ) ||
                        (
                          !parseInt(unita.unitaA) &&
                          (parseInt(qPrestazione) >= parseInt(unita.unitaDa))
                        )
                      ) {
                        calc = '€ ' + moneyFormat(parseInt(qPrestazione) * unita.valore);
                      }
                    })
                  }
                })
              }
              break;
            case 2:
              calc = messaggioErrore;
              if (!isNullOrUndefined(js.offertaApacchetto) &&
                (parseInt(qPrestazione) >= parseInt(js.offertaApacchetto.qtMinimaUnita))) {
                js.offertaApacchetto.listaPrezzi.forEach(lista => {
                  if ((parseInt(lista.numPersoneDa) <= parseInt(qPersone)) && (parseInt(qPersone) <= parseInt(lista.numPersoneA))) {
                    lista.offerta.forEach(unita => {
                      if (
                        (
                          (parseInt(unita.unitaDa) <= parseInt(qPrestazione)) &&
                          (parseInt(qPrestazione) <= parseInt(unita.unitaA))
                        ) ||
                        (
                          !parseInt(unita.unitaA) &&
                          (parseInt(qPrestazione) >= parseInt(unita.unitaDa))
                        )
                      ) {
                        calc = '€ ' + moneyFormat(unita.valore * parseInt(qPrestazione));
                      } 
                    })
                  }
                })
              }
              break;
            default:
          }
        } else calc = messaggioErrore;
        break;
      default:
        break;
    }
  }
  return calc;
};
