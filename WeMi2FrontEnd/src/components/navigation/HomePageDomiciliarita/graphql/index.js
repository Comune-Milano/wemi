const allCategorie018QueryName = 'getAllCategories018';
const allCategoriesDomQueryName = 'getAllCategoriesDom';


export const getAll018 = [
  '',
  `query {
    ${allCategorie018QueryName} {
     areeCategoria {
      id
      title
      progressive
      categorie {
        id
        title
        progressive
        image {
          id
          path
          name
        }
        sottotipo
      }
     }
    }
  }`,
  allCategorie018QueryName,
];

export const getAllDom = [
  '',
  `query ${allCategoriesDomQueryName} {
    ${allCategoriesDomQueryName} {
     areeCategoria {
      id
      title
      progressive
      categorie {
        id
        title
        progressive
        image {
          id
          path
          name
        }
        sottotipo
      }
     }
    }
  }`,
  allCategoriesDomQueryName,
];
