const dominioByTipoSQueryName = 'dominioByTipoS';

export const getDominioByTipoS = [
  '',
  `query ${dominioByTipoSQueryName} ($typeDominio: String!){
    ${dominioByTipoSQueryName}(ty_dominio:$typeDominio){
      textValue
      value
    }
  }`,
  dominioByTipoSQueryName,
];
