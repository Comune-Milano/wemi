
  export const contenutoAssociatoByTy = (ty) => [
    'contenutoAssociatoByTy',
    `{
        contenutoByTy(ty_contenuto: ${ty}){
        id_contenuto
        ty_contenuto
        tl_testo_1
      }
    }`,
  ];




  export const contenutoMediaPK = (id) => [
    '',
    `{
      contenutoMediaPK(id_contenuto: ${id}) {
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
        js_dati_contenuto
    id_contenuto_primario
        id_contenuto_associato
        nm_relazione
        ts_creazioneASS
        ts_variazione_stato
    cd_stato_contenuto
        id_utente
        ty_mime_type_media1
        nm_nome_media1
        oj_media1
        ty_mime_type_media2
        nm_nome_media2
        oj_media2
        ty_mime_type_media3
         nm_nome_media3
        oj_media3
      
      }
    }`
  ];