const allCategorie018QueryName = 'getAllCategories018';

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
        description
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
