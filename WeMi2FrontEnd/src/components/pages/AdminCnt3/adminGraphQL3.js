/** @format */
//import { jsonNoquotesOnKeys } from 'utils/functions';

const jsonNoquotesOnKeys = (obj) => {
  if (typeof obj === "object")
    obj = JSON.stringify(obj);
  obj = obj.replace(/"(\w+)"\s*:/g, '$1:');
  return obj;
}
export const datiEssenziali = () => [
  'selectServizi',
  `
  { 
  EstraiListaCategorieAccreditamentoPubblicate{
    id_contenuto
    tl_testo_1
  }

  EstraiUnitaPrezzo{
    cd_unita_prezzo
    tl_testo_aggettivo
    tl_testo_sostantivo
    pg_visualizzazione
  }

  contenutoPubblicatoByTy(ty_contenuto: 4){
  id_contenuto
  ty_contenuto
  tl_testo_1
  }

  mansioniPubblicateAll{
  idMansione
  txTitoloMansione
  }

  destinatariPubblicati{
  idDestinatario
  txDestinatario
  } 
  
}`]
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
    contenutoMediaPK(id_contenuto:${id}){
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
    }
  }`
];

export const EstraiUnitaPrezzo = () => [
  '',
  `{
    EstraiUnitaPrezzo{
      cd_unita_prezzo
      tl_testo_aggettivo
      tl_testo_sostantivo
      pg_visualizzazione
    }
  }`
]

export const EstraiContenutoCompleto = (id) => [
  'CNT003EstrazioneDati',
  `{
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
      nr_ordine_visualizzazione
    }
    associates
  }
}`
]


// export const mediaPK = (id) => [
//   '',
//   `{
//     mediaPK(id_media:${id})
//     {
//       id_media
//       ty_mime_type_media
//       nm_nome_media
//       oj_media
//       ts_creazione
//     }
//   }`
// ];

// export const contenutoUPD = (myJSON) => [
// '',
// `mutation{
//   contenutoUPD(input:{
//     id_contenuto:${myJSON.id_contenuto}
//     ty_contenuto_id:${myJSON.ty_contenuto_id}
//     ty_sottotipo_contenuto:${myJSON.ty_sottotipo_contenuto}
//     nr_ordine_visualizzazione:${myJSON.nr_ordine_visualizzazione}
//     id_contenuto_associato: ${myJSON.id_contenuto_associato}
//     tl_testo_1: ${jsonNoquotesOnKeys(myJSON.tl_testo_1)}
//     tl_testo_2: ${jsonNoquotesOnKeys(myJSON.tl_testo_2)}
//     tl_testo_3: ${myJSON.tl_testo_3}
//     tl_testo_4: ${myJSON.tl_testo_4}
//     tl_testo_5:${myJSON.tl_testo_5}
//     ln_link_1: ${myJSON.ln_link_1}
//     ln_link_2: ${myJSON.ln_link_2}  
//     js_dati_contenuto: ${ jsonNoquotesOnKeys(myJSON.js_dati_contenuto) }
//     id_media1:${myJSON.id_media1}
//     id_media2:${myJSON.id_media2}
//   })
// }`
// ];

export const contenutoMediaADD = (myJSON) => [
  '',
  `mutation{
    contenutoMediaADD(input:{
      ty_contenuto:${myJSON.ty_contenuto}
      ty_sottotipo_contenuto:${myJSON.ty_sottotipo_contenuto}
      nr_ordine_visualizzazione:${myJSON.nr_ordine_visualizzazione}
      tl_testo_1: ${jsonNoquotesOnKeys(myJSON.tl_testo_1)}
      tl_testo_2: ${jsonNoquotesOnKeys(myJSON.tl_testo_2)}
      tl_testo_3: ${jsonNoquotesOnKeys(myJSON.tl_testo_3)}
      tl_testo_4: ${jsonNoquotesOnKeys(myJSON.tl_testo_4)}
      tl_testo_5: ${jsonNoquotesOnKeys(myJSON.tl_testo_5)}
      ln_link_1: "${myJSON.ln_link_1}"
      ln_link_2: "${myJSON.ln_link_2}"      
      dt_fine_val:"${myJSON.dt_fine_val}" 
      js_dati_contenuto:${jsonNoquotesOnKeys(myJSON.js_dati_contenuto)}
      cd_stato_contenuto:${myJSON.cd_stato_contenuto}
      ty_mime_type_media1:"${myJSON.ty_mime_type_media1}"
      ty_mime_type_media2:"${myJSON.ty_mime_type_media2}"
      ty_mime_type_media3:"${myJSON.ty_mime_type_media3}"
      nm_nome_media1:"${myJSON.nm_nome_media1}"
      nm_nome_media2:"${myJSON.nm_nome_media2}"
      nm_nome_media3:"${myJSON.nm_nome_media3}"
      oj_media1:"${myJSON.oj_media1}"
      oj_media2:"${myJSON.oj_media2}"
      oj_media3:"${myJSON.oj_media3}"
      id_contenuto_associato:${myJSON.id_contenuto_associato}
      id_utente:${myJSON.id_utente}
      nm_relazione:"${myJSON.nm_relazione}"
    })
  }
  `
];

export const contenutoAss = (id) => [
  '',
  `{
      contenutoAss(ty_contenuto_id:${id}){
        textValue
        value
      }
    }`,
];

export const mediaAll = () => [
  '',
  `{
      mediaAll{
        textValue
        value
      }
    }`,
];


export const tipologiaContenutoPK = (id) => [
  '',
  `{
      tipologiaContenutoPK(id:${id}){
        ty_contenuto
        id
      }
    }`,
];
