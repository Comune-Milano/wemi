/** @format */


export const getFooterLinks = (stt) => [
  'FooterLinks',
`{queryFooter (stt : ${stt ? stt:0}){
  col1{
    id_contenuto
    ty_contenuto
    ty_sottotipo_contenuto
    tl_testo_1
    tl_testo_2
    tl_testo_5
    ln_link_1
    id_media1
    oj_media1
    ty_mime_type_media1
    nm_nome_media1

    id_media2
    oj_media2
    ty_mime_type_media2
    nm_nome_media2

    
  }
  col2{
   id_contenuto
    ty_contenuto
    ty_sottotipo_contenuto
    tl_testo_1
    tl_testo_2
    tl_testo_5
    ln_link_1
    id_media1
    oj_media1
    ty_mime_type_media1
    nm_nome_media1

    id_media2
    oj_media2
    ty_mime_type_media2
    nm_nome_media2
    
  }
}
}`
]
// export const contenutiTy = (id,status) =>[
//   '',
//   `{
//     contenutiTy(ty_contenuto_id:${id},cd_stato_contenuto:${status})
//     {
//       id_contenuto 
//       ty_contenuto_id
//       ty_sottotipo_contenuto 
//       nr_ordine_visualizzazione 
//       id_contenuto_sostituito
//       pg_versione 
//       tl_testo_1 tl_testo_2 tl_testo_3 tl_testo_4 tl_testo_5 
//       ln_link_1 ln_link_2
//       id_media1 id_media2
//       dt_inizio_val dt_fine_val
//       js_dati_contenuto
//       id_contenuto_associato
//       cd_stato_contenuto
//       cd_stato_contenuto_desc
//       ts_creazione
//       id_utente
//     }
//   }`,
// ];

export const contenutoTy = (id,status) =>[
  '',
  `{
    contenutoTy(ty_contenuto:${id}, cd_stato_contenuto:${status})
    {
      id_contenuto
      id_contenuto_rif
      ty_sottotipo_contenuto
      nr_ordine_visualizzazione
      pg_versione
      tl_testo_1
      tl_testo_2
      tl_testo_3
      tl_testo_4
      tl_testo_5
      cd_stato_contenuto
      cd_stato_contenuto_desc
      js_dati_contenuto
    }
  }`,
];

export const statoContenutoUPD = (id, status, ut) => [
  '',
  ` mutation{
    statoContenutoUPD(input:{id_contenuto:${id},cd_stato_contenuto:${status},id_utente:${ut}})
  }`,
];

export const dominioByTipoS = (id) => [
  '',
  `{
    dominioByTipoS(ty_dominio:"${id}"){
      textValue
      value
    }
  }`,
];

export const tipologiaContenutoPK = (ty) => [
  '',
  `{
    tipologiaContenutoPK(id:${ty}){
      ty_contenuto
      id
    }
  }`,
];


export const contenutiPK = (id) => [
  '',
  `{
  contenutiPK(id_contenuto:${id})
    {
      id_contenuto 
      ty_contenuto_id
      ty_sottotipo_contenuto 
      nr_ordine_visualizzazione 
      id_contenuto_sostituito
      pg_versione 
      tl_testo_1 tl_testo_2 tl_testo_3 tl_testo_4 tl_testo_5 
      ln_link_1 ln_link_2
      id_media1 id_media2
      dt_inizio_val dt_fine_val
      js_dati_contenuto
      id_contenuto_associato
      cd_stato_contenuto
      cd_stato_contenuto_desc
      ts_creazione
      id_utente
    }
  }`
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




export const EstraiContenutoCompleto = (id) => [
  'CNT003EstrazioneDati',
  `{
    EstraiListaCategorieAccreditamento{
      id_contenuto
      tl_testo_1
  }

    EstraiUnitaPrezzo{
      cd_unita_prezzo
      tl_testo_aggettivo
      tl_testo_sostantivo
      pg_visualizzazione
  }
  EstraiContenutoCompleto(idContenuto: ${id}) {
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
    ts_creazione
    tagsRicerca
    unitaPrezzo
    idCategoriaAccreditamento
    media1 {
      id_media
      ty_mime_type_media
      nm_nome_media
      oj_media
      ts_creazione
    }
    media2 {
        id_media
      ty_mime_type_media
      nm_nome_media
      oj_media
      ts_creazione
    }
    media3 {
        id_media
      ty_mime_type_media
      nm_nome_media
      oj_media
      ts_creazione
    }
    associati {
      id_contenuto_rif
      ty_contenuto
      tl_testo_1
      tl_testo_2
    }
  }
}`
]

