import { cdAttributo } from "../../CodiciAttributi";

export const calcolaFasciaEta = (eta, fasceEta) => {
    let fascia = {};
    if (eta >= 0 && eta <= 2) {
      fascia = fasceEta.data[0]
    }
    else if (eta >= 3 && eta <= 5) {
      fascia = fasceEta.data[1]
    }
    else if (eta >= 6 && eta <= 10) {
      fascia = fasceEta.data[2]
    }
    else if (eta >= 11 && eta <= 13) {
        fascia = fasceEta.data[3]
      }
    else if (eta > 13) {
      fascia = fasceEta.data[4]
    }
    return {
      cd_attributo: cdAttributo.CD_FASCIA_ETA_BENEF_BAMBINO,
      cd_val_attributo: fascia.cdDominioTcb,
    }
  };
