
const allCategories018CrossQueryName = 'getAllCategories018Cross';

export const getAll018Cross = [
  '',
  `query {
    ${allCategories018CrossQueryName} {
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
  allCategories018CrossQueryName,
];
