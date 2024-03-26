
import { getObjectValue } from 'utils/extensions/objectExtensions';

export const mapRecensione = (recensione) => {
  const formFields = {
    valutazioneAdeguatezza: getObjectValue(recensione, 'js_dati_recensione_wemi.adeguatezzaProfilo', 0),
    valutazioneGenerale: getObjectValue(recensione, 'js_dati_recensione_wemi.valutazioneGenerale', 0),
    valutazioneVelocita: getObjectValue(recensione, 'js_dati_recensione_wemi.velocitaRisposta', 0),
    valutazioneFacilità: getObjectValue(recensione, 'js_dati_recensione_wemi.facilitaUtilizzo', 0),
    scriviNota: getObjectValue(recensione, 'js_dati_recensione_wemi.txtRecensione', ''),
    statoRecensione: getObjectValue(recensione, 'cd_stato_rec_wemi', undefined),
  };

  return formFields;
};
