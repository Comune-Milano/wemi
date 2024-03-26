export const estraiSpazioWemi = [
  '',
  `
      query contenutoById ($idContenuto: Int!) {
        contenutoById(idContenuto: $idContenuto){
          id_contenuto
          ty_contenuto
          id_contenuto_rif
          ty_sottotipo_contenuto
          nr_ordine_visualizzazione
          pg_versione
          tl_testo_1
          tl_testo_2
          tl_testo_3
          tl_testo_4
          tl_testo_5
          ln_link_1
          ln_link_2
          id_media1
          id_media2
          id_media3
          dt_inizio_val
          dt_fine_val
          id_contenuto_associato
          nm_relazione
          ts_creazione
          cd_stato_contenuto
          id_utente
          oj_media1
          js_dati_contenuto
        }
      }
    `,
  'contenutoById',
];
