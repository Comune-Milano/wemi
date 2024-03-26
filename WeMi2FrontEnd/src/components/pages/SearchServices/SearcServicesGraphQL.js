const searchServicesQueryName = 'services';
const searchCategoryQueryName = 'category';
export const getServices = [
  '',
  `query($idCategoria: Int, $tag: String, $is0_18: Boolean) {
    ${searchServicesQueryName}(
      filters: {
        tag: $tag
        idCategoria: $idCategoria
        is0_18: $is0_18
      }
    ) {
      serviceId
      name
      categoryId
      tag 
    }
    ${searchCategoryQueryName}(
      idCategoria: $idCategoria
    ) {
      categoryId
      name
      description
      media
    }
  }`,
  '',
];

const allCategories = 'getAllCategoriesByTag';

export const getCategories = [
  '',
  `query ($tag: String!) {
    ${allCategories} (tag: $tag) {
     services {
      idServizio
      tipoArea
      datiSezione
      nomeServizio
    }
    }
  }`,
  allCategories,
];
