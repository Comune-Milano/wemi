/** @format */
const contenutoTestoCarouselQueryName = 'contenutoTestoCarousel';
export const getContenutoTestoCarousel = [
  '',
  `query ($flag: Boolean!) {
    ${contenutoTestoCarouselQueryName} (
      ty_contenuto: 12,
      stt: $flag
    ) {
      id_contenuto
      tl_testo_1
      tl_testo_2
      tl_testo_3
      tl_testo_4
      tl_testo_5
      ln_link_1
      iw_path_media1
      nr_ordine_visualizzazione
    }
  }`,
  contenutoTestoCarouselQueryName,
];

const allCategorieQueryName = 'allCategorie';

export const getAllCategorie = [
  '',
  `query ($number: Int!) {
    ${allCategorieQueryName} (
      stt: $number
    ) {
      idCategoria
      txTitoloCategoria
      sottotipo
      media{
        id_media
        iw_path
      }
      areeCategoria{
        idArea
        txTitoloArea
        nrOrdineVisualizzazione
      }
    }
  }`,
  allCategorieQueryName,
];

const contenutoCardQueryName = 'contenutoCards';

export const getContenutoCards = [
  '',
  `query ($flag: Boolean!) {
    ${contenutoCardQueryName} (
      ty_contenuto: 8,
      stt: $flag
    ) {
      id_contenuto,
      tl_testo_1,
      tl_testo_2,
      tl_testo_3,
      iw_path_media1,
      nr_ordine_visualizzazione
    }
  }`,
  contenutoCardQueryName
];

const estraiDatiAccountabilityQueryName = 'EstraiDatiAccountability';

export const getDatiAccountability = [
  '',
  `query {
    ${estraiDatiAccountabilityQueryName} {
      serviziOfferti
      entiAccreditati
      operatoriAccreditati
      cittadiniIscritti
    }
  }`,
  estraiDatiAccountabilityQueryName,
];

export const homePageDataQuery = [
  '',
  `
  query homePageDataQuery(
    $sttCarouselFlag: Boolean!,
    $sttCategorieNumber: Int!,
    $sttCardsFlag: Boolean!
  ) {
    contenutoTestoCarousel(ty_contenuto: 12, stt: $sttCarouselFlag){
      id_contenuto,
      tl_testo_1,
      tl_testo_2,
      tl_testo_3,
      tl_testo_4,
      tl_testo_5,
      ln_link_1,
      oj_media1
    }
    
    allCategorie (stt: $sttCategorieNumber) {
      idCategoria
      txTitoloCategoria
      sottotipo
      media {
        id_media
        oj_media
      }
      areeCategoria{
        idArea
        txTitoloArea
        nrOrdineVisualizzazione
      }
    }

    contenutoCards(ty_contenuto: 8, stt: $sttCardsFlag) {
      id_contenuto,
      tl_testo_1,
      tl_testo_2,
      tl_testo_3,
      oj_media1,
      nr_ordine_visualizzazione
    }

    EstraiDatiAccountability{
      serviziOfferti
      entiAccreditati
      operatoriAccreditati
      cittadiniIscritti
    }
  }`,
  '',
];
const estraiFilteredTagsQueryName = 'EstraiTag';

export const getFilteredTags = [
  '',
  `query ($string: String!) {
    ${estraiFilteredTagsQueryName} (
      string: $string
    )
  }`,
  estraiFilteredTagsQueryName,
];

export const getContentAllSections = [
  '',
  `query getContentAllSections {
  getContentAllSections {
    list {
      id
      title
      description
      color
      link
      progressive
      image {
        path
      }
    }
    total
  }
}
`,
  'getContentAllSections',
];
