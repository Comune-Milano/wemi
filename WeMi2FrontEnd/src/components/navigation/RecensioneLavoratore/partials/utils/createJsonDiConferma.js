
export const createJsonDiConferma = (
    id_rich_serv_rec,
    dataset,
    qtMediaSingolaRecensione,
    cd_stato_rec
) => ({
  id_rich_serv_rec,
  js_dati_recensione: {
    valutazioneGenerale: dataset.valutazioneGenerale,
    carattere: dataset.carattere,
    capacitaComunicative: dataset.capacitaComunicative,
    capacitaAdattamento: dataset.capacitaAdattamento,
    capacitaGestTempo: dataset.capacitaGestTempo,
    capacitaRelazionali: qtMediaSingolaRecensione,
    txNotaRecensione: dataset.txNotaRecensione,
  },
  qt_media_singola_recensione: qtMediaSingolaRecensione,
  JsonFiltro: dataset.listaMansioni,
  cd_stato_rec,
  id_richiesta_servizio_tcb: id_rich_serv_rec,
});
