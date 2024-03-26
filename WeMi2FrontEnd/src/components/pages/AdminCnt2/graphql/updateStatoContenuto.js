const statoContenutoUPDMutationName = 'statoContenutoUPD';

export const statoContenutoUPD =  [
  '',
  ` mutation ${statoContenutoUPDMutationName}($idContenuto: ID!, $statoContenuto: Int!, $idUtente: Int!){
    ${statoContenutoUPDMutationName}(input:{id_contenuto: $idContenuto, cd_stato_contenuto: $statoContenuto, id_utente:$idUtente})
  }`,

];