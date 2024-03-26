export const getRecensioni = [
  '',
  `
  query ($idEnte: Int!, $idServizioRiferimento: Int!) {
    EstraiRecensioni(
      idEnte:$idEnte,
      idServizioRiferimento: $idServizioRiferimento
    ) {
      id_rich_serv_rec
      ts_creazione
      js_dati_recensione
      utente
      qt_media_singola_recensione
      ultimoStato{
        cd_stato_recensione
      }
      nm_ente
      tl_testo_1
      tx_nome_utente
    }
  }
  `,
  'EstraiRecensioni',
];
