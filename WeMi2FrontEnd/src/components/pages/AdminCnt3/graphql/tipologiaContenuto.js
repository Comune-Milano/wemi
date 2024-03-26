const tipologiaContenutoQueryName = 'tipologiaContenutoPK';

export const tipologiaContenutoPK = [
  '',
  `query ${tipologiaContenutoQueryName}( $typeContenuto: ID!){
    ${tipologiaContenutoQueryName}(id: $typeContenuto){
      ty_contenuto
      id
    }
  }`,
  tipologiaContenutoQueryName
];