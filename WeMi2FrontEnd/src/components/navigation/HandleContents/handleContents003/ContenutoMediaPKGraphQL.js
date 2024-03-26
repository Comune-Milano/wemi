import { isNullOrUndefined } from "util";

/** @format */

const jsonNoquotesOnKeys = (obj) => {
  if (typeof obj === "object") {
      obj = JSON.stringify(obj);
  }
  obj=obj.replace(/"(\w+)"\s*:/g, '$1:');
  return obj;
  }


export const DeleteMedia = (args) => ['', 
`
mutation{
  DeleteMediaWithContenuto(idMedia: ${args.idMedia}, idContenuto: ${args.IDCont})
}`]
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
    mansioneAll{
      idMansione
      txTitoloMansione
    }
    destinatari{
      idDestinatario
      txDestinatario
    }
    EstraiContenutoCompleto(idContenuto: ${id}) {
      js_dati_contenuto
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
  }
`
];

/**
 * Query to extract all municipalities
 */
const getMunicipiQueryName = 'municipioAll';
export const getMunicipi = [
  '',
  `query ${getMunicipiQueryName}{
    ${getMunicipiQueryName}{
      idMunicipio
      nmMunicipio
    }
  }`,
  getMunicipiQueryName,
];

const contenutoMediaADDQueryName = 'contenutoMediaADD';
export const contenutoMediaADD = [
  '',
  `mutation ${contenutoMediaADDQueryName}($input: contenutoMediaADDinput!){
    ${contenutoMediaADDQueryName}(input: $input)
  }`,
  '',
];

const modificaContenutoMutationName = 'ModificaContenuto';
export const modificaContenuto = [
  '',
  `
  mutation ${modificaContenutoMutationName}($input: contenutoInputModifica!){
    ${modificaContenutoMutationName}(input: $input)
  }
  `,
  '',
];

export const estraiVociMenu = () => [
  'VociMenu',
`{
  estraiVociMenu {
    idLiv1
    txLiv1
    linkLiv1
    footerColDx
    liv2 {
      idLiv2
      txLiv2
      linkLiv2
      sottotipo
      media1 {
        id_media
        ty_mime_type_media
        nm_nome_media
        oj_media   
      }
    }
  } 
  }
`];






export const getFooterLinks = () => [
  'FooterLinks',
`{queryFooter{
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