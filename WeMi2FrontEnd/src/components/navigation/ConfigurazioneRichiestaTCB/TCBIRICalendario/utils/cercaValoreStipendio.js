import { attributi, cercaValore } from './';

const cercaValoreStipendio = (arrayDisponibilita, tipologiaOrario) => {
    let risultato = {}
    if (tipologiaOrario && arrayDisponibilita) {
      if (tipologiaOrario.id === 1)
        risultato = cercaValore(arrayDisponibilita, attributi.CD_STIPENDIO_CONVIVENTE.cd_attributo)
      if (tipologiaOrario.id === 2)
        risultato = cercaValore(arrayDisponibilita, attributi.CD_STIPENDIO_A_CONVIVENZA_RIDOTTA.cd_attributo)
      if (tipologiaOrario.id === 3)
        risultato = cercaValore(arrayDisponibilita, attributi.CD_STIPENDIO_NON_CONVIVENTE.cd_attributo)
      if (tipologiaOrario.id === 4)
        risultato = cercaValore(arrayDisponibilita, attributi.CD_STIPENDIO_PRESENZA_NOTTURNA.cd_attributo)
      if (tipologiaOrario.id === 5)
        risultato = cercaValore(arrayDisponibilita, attributi.CD_STIPENDIO_WEEKEND.cd_attributo)
      if (tipologiaOrario.id === 6)
        risultato = cercaValore(arrayDisponibilita, attributi.CD_STIPENDIO_ASSISTENZA_NOTTURNA.cd_attributo)
      return risultato
    }
    else{
      return null;
    }
  
  }

  export default cercaValoreStipendio;