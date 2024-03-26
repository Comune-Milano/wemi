import { getObjectValue } from 'utils/extensions/objectExtensions';
import { CD_TIPOLOGICA_ALTRO } from 'types/tcbConstants';
import { inizializzaCheckboxValue } from './inizializzaCheckboxValue';

export const getInitialDataset = (EstraiRecensione, EstraiRichiesta, DatiLavoratore, Estrailista, locale) => ({
  statoRecensione: getObjectValue(EstraiRecensione, 'cd_stato_rec', null),
  capacitaAdattamento: getObjectValue(EstraiRecensione, 'js_dati_recensione.capacitaAdattamento', null),
  capacitaComunicative: getObjectValue(EstraiRecensione, 'js_dati_recensione.capacitaComunicative', null),
  capacitaGestTempo: getObjectValue(EstraiRecensione, 'js_dati_recensione.capacitaGestTempo', null),
  carattere: getObjectValue(EstraiRecensione, 'js_dati_recensione.carattere', []),
  capacitaRelazionali: getObjectValue(EstraiRecensione, 'js_dati_recensione.capacitaRelazionali', null),
  txNotaRecensione: getObjectValue(EstraiRecensione, 'js_dati_recensione.txNotaRecensione', null),
  valutazioneGenerale: getObjectValue(EstraiRecensione, 'js_dati_recensione.valutazioneGenerale', null),
  qtMediaSingolaRecensione: getObjectValue(EstraiRecensione, 'qt_media_singola_recensione', null),
  serviziPrestati: EstraiRichiesta.filter(el => el.nomeservizio !== null),
  isAltroServizio: !!EstraiRichiesta.find(el => el.id_servizio_erogato_ente === CD_TIPOLOGICA_ALTRO),
  idLavoratore: getObjectValue(DatiLavoratore, 'codiceLavoratore', null),
  nomeLavoratore: getObjectValue(DatiLavoratore, 'nome', null),
  isOnlyLavoratore: true,
  cognomeLavoratore: getObjectValue(DatiLavoratore, 'cognome', null),
  listaMansioni: inizializzaCheckboxValue(Estrailista, locale),
});
