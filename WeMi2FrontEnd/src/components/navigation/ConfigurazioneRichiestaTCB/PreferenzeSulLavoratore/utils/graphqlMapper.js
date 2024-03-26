
import { ATTRIBUTI_REF_LAV } from './attributiReferenzeLavoratore';
import {
  booleanAttributeTransformer,
  textAttributeTransformer,
  numericAttributeTransformer,
  multiSelectAttributeTransfomer,
  selectAttributeTransformer,
} from './attributeTransformer';

/**
 * Gets the data indexed by attribute identifier.
 * @param {[]} datiReferenzaLavoratore
 */
class DatiRefLavoratoreAttributeMap {
  constructor(datiReferenzaLavoratore) {
    this.map = datiReferenzaLavoratore.reduce(
      (accumulator, attributo) => {
        const accumulatorAttribute = accumulator[attributo.cd_attributo];
        if (!accumulatorAttribute) {
          return ({ ...accumulator, [attributo.cd_attributo]: [attributo] });
        }
        return ({ ...accumulator, [attributo.cd_attributo]: accumulatorAttribute.concat(attributo) });
      },
      {}
    );
  }

  getAttributeByID(cdAttributo) {
    return this.map[cdAttributo] || [];
  }

  getFirstAttributeByID(cdAttributo) {
    const attribute = this.map[cdAttributo] || [];
    return attribute[0];
  }

  getNoteAttributeByID(cdAttributo) {
    const attributes = this.getAttributeByID(cdAttributo);
    const noteAttribute = attributes.find(attr => attr.cd_val_attributo === 0);
    return noteAttribute ? noteAttribute.tx_nota : '';
  }
}

/**
 * Maps the http response to related state.
 */
export const mapResponseToState = (datiReferenzaLavoratore) => {
  const map = new DatiRefLavoratoreAttributeMap(datiReferenzaLavoratore);

  return {
    // PREFERENZA ETA (text-multiselect)
    etaLavoratore: multiSelectAttributeTransfomer(
      map.getAttributeByID(ATTRIBUTI_REF_LAV.preferenzaEta)
    ),
    // ISTRUZIONI TATA (text-multiselect)
    istruzioneTata: multiSelectAttributeTransfomer(
      map.getAttributeByID(ATTRIBUTI_REF_LAV.istruzioneTata)
    ),
    // ESPERIENZE PREGRESSE (text-multiselect)
    esperienzeLavoratore: multiSelectAttributeTransfomer(
      map.getAttributeByID(ATTRIBUTI_REF_LAV.esperienzePregresse)
    ),
    // NOTA ESPERIENZE PREGRESSE
    notaEsperienzeLavoratore: map.getNoteAttributeByID(ATTRIBUTI_REF_LAV.esperienzePregresse),
    // LINGUE PARLATE (text-multiselect)
    lingueParlate: multiSelectAttributeTransfomer(
      map.getAttributeByID(ATTRIBUTI_REF_LAV.lingueParlate)
    ),
    notaLingueParlate: map.getNoteAttributeByID(ATTRIBUTI_REF_LAV.lingueParlate),
    // PREFERENZA CARATTERE (text-multiselect)
    carattereLavoratore: multiSelectAttributeTransfomer(
      map.getAttributeByID(ATTRIBUTI_REF_LAV.preferenzeCarattere)
    ),
    notaCarattereLavoratore: map.getNoteAttributeByID(ATTRIBUTI_REF_LAV.preferenzeCarattere),
    // PREFERENZA SESSO (text-select)
    sessoLavoratore: selectAttributeTransformer(
      map.getFirstAttributeByID(ATTRIBUTI_REF_LAV.sessoLavoratore)
    ),
    // TITOLO DI STUDIO (text-select)
    titoloStudioLavoratore: selectAttributeTransformer(
      map.getFirstAttributeByID(ATTRIBUTI_REF_LAV.titoloStudioLavoratore)
    ),
    notaTitoloStudioLavoratore: map.getNoteAttributeByID(ATTRIBUTI_REF_LAV.titoloStudioLavoratore),
    // ESPERIENZA COME TATA/BADANTE/COLF?
    esperienzaCon: booleanAttributeTransformer(
      map.getFirstAttributeByID(ATTRIBUTI_REF_LAV.esperienzaCon)
    ),
    // POSSESSO AUTO
    possessoAuto: booleanAttributeTransformer(
      map.getFirstAttributeByID(ATTRIBUTI_REF_LAV.possessoAuto)
    ),
    // POSSESSO PATENTE
    possessoPatente: booleanAttributeTransformer(
      map.getFirstAttributeByID(ATTRIBUTI_REF_LAV.possessoPatente)
    ),
    // ISCRIZIONE REGIONE
    iscrizioneRegione: booleanAttributeTransformer(
      map.getFirstAttributeByID(ATTRIBUTI_REF_LAV.iscrizioneRegione)
    ),
    // ANNI DI ESPERIENZA
    anniEsperienza: numericAttributeTransformer(
      map.getFirstAttributeByID(ATTRIBUTI_REF_LAV.anniEsperienza)
    ),
    // VALUTAZIONE ESPERIENZE
    valutazioneEsperienze: textAttributeTransformer(
      map.getFirstAttributeByID(ATTRIBUTI_REF_LAV.valutazioneEsperienza)
    ),
    // ALTRE PREFERENZE
    altrePreferenze: textAttributeTransformer(
      map.getFirstAttributeByID(ATTRIBUTI_REF_LAV.altrePreferenze)
    ),
  };
};

/**
 * Maps the state to request data.
 */
export const mapStateToRequestData = state => {
  const requestData = [
    // SESSO LAVORATORE (TIPO DOMINIO)
    {
      cd_attributo: ATTRIBUTI_REF_LAV.sessoLavoratore,
      cd_val_attributo: state.sessoLavoratore && state.sessoLavoratore.id,
      tx_val: state.sessoLavoratore && state.sessoLavoratore.value,
    },
    // TITOLO STUDIO (TIPO DOMINIO)
    {
      cd_attributo: ATTRIBUTI_REF_LAV.titoloStudioLavoratore,
      cd_val_attributo: state.titoloStudioLavoratore && state.titoloStudioLavoratore.id,
      tx_val: state.titoloStudioLavoratore && state.titoloStudioLavoratore.value,
      tx_nota: state.titoloStudioLavoratore && state.titoloStudioLavoratore.id === 0 ?
        state.notaTitoloStudioLavoratore :
        '',
    },
    // GIA AVUTO ESPERIENZE CON BADANTE/COLF/TATA?
    {
      cd_attributo: ATTRIBUTI_REF_LAV.esperienzaCon,
      cd_val_attributo: 1,
      fg_val: state.esperienzaCon ? '1' : '0',
    },
    // LAVORATORE AUTOMUNITO
    {
      cd_attributo: ATTRIBUTI_REF_LAV.possessoAuto,
      cd_val_attributo: 1,
      fg_val: state.possessoAuto ? '1' : '0',
    },
    // IL LAVORATORE HA LA PATENTE?
    {
      cd_attributo: ATTRIBUTI_REF_LAV.possessoPatente,
      cd_val_attributo: 1,
      fg_val: state.possessoPatente ? '1' : '0',
    },
    // ISCRITTA AL REGISTRO TERRITORIALE REGIONE
    {
      cd_attributo: ATTRIBUTI_REF_LAV.iscrizioneRegione,
      cd_val_attributo: 1,
      fg_val: state.iscrizioneRegione ? '1' : '0',
    },
    {
      cd_attributo: ATTRIBUTI_REF_LAV.anniEsperienza,
      cd_val_attributo: 1,
      nr_val: state.anniEsperienza ? state.anniEsperienza : null,
    },
    // VALUTAZIONE ESPERIENZA COME BADANTE/COLF/TATA
    {
      cd_attributo: ATTRIBUTI_REF_LAV.valutazioneEsperienza,
      cd_val_attributo: 1,
      tx_val: state.valutazioneEsperienze ? state.valutazioneEsperienze : '',
    },
    // ALTRE PREFERENZE
    {
      cd_attributo: ATTRIBUTI_REF_LAV.altrePreferenze,
      cd_val_attributo: 1,
      tx_val: state.altrePreferenze ? state.altrePreferenze : '',
    },
  ];

  // PREFERENZA ETA
  if (state.etaLavoratore && state.etaLavoratore.length > 0) {
    const etaLavoratore = state.etaLavoratore.map(element => ({
      cd_attributo: ATTRIBUTI_REF_LAV.preferenzaEta,
      cd_val_attributo: element.id,
      tx_val: element.value,
    }));

    requestData.push(...etaLavoratore);
  } else {
    requestData.push({
      cd_attributo: ATTRIBUTI_REF_LAV.preferenzaEta,
      cd_val_attributo: -1,
    });
  }

  // ESPERIENZE PREGRESSE
  if (state.esperienzeLavoratore && state.esperienzeLavoratore.length > 0) {
    const esperienzeLavoratore = state.esperienzeLavoratore.map(element => ({
      cd_attributo: ATTRIBUTI_REF_LAV.esperienzePregresse,
      cd_val_attributo: element.id,
      tx_val: element.value,
      tx_nota: element.id === 0 ? state.notaEsperienzeLavoratore : '',
    }));

    requestData.push(...esperienzeLavoratore);
  } else {
    requestData.push({
      cd_attributo: ATTRIBUTI_REF_LAV.esperienzePregresse,
      cd_val_attributo: -1,
    });
  }

  // LINGUE PARLATE
  if (state.lingueParlate && state.lingueParlate.length > 0) {
    const lingueParlate = state.lingueParlate.map(element => ({
      cd_attributo: ATTRIBUTI_REF_LAV.lingueParlate,
      cd_val_attributo: element.id,
      tx_val: element.value,
      tx_nota: element.id === 0 ? state.notaLingueParlate : '',
    }));

    requestData.push(...lingueParlate);
  } else {
    requestData.push({
      cd_attributo: ATTRIBUTI_REF_LAV.lingueParlate,
      cd_val_attributo: -1,
    });
  }

  // PREFERENZA CARATTERE
  if (state.carattereLavoratore && state.carattereLavoratore.length > 0) {
    const carattereLavoratore = state.carattereLavoratore.map(element => ({
      cd_attributo: ATTRIBUTI_REF_LAV.preferenzeCarattere,
      cd_val_attributo: element.id,
      tx_val: element.value,
      tx_nota: element.id === 0 ? state.notaCarattereLavoratore : '',
    }));

    requestData.push(...carattereLavoratore);
  } else {
    requestData.push({
      cd_attributo: ATTRIBUTI_REF_LAV.preferenzeCarattere,
      cd_val_attributo: -1,
    });
  }

  // ISTRUZIONI TATA
  if (state.istruzioneTata && state.istruzioneTata.length > 0) {
    const istruzioneTataArray = [...state.istruzioneTata];
    istruzioneTataArray.forEach(el => {
      requestData.push({
        cd_attributo: ATTRIBUTI_REF_LAV.istruzioneTata,
        cd_val_attributo: el.id,
      });
    });
  } else {
    requestData.push({
      cd_attributo: ATTRIBUTI_REF_LAV.istruzioneTata,
      cd_val_attributo: -1,
    });
  }

  return requestData;
};
