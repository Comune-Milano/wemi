/** @format */
  
  export const dominioByTipoS = (id) => [
    '',
    `{
      dominioByTipoS(ty_dominio:"${id}"){
        textValue
        value
      }
    }`,
  ];
  