const matchWorkerMutationName = 'matchLavoratore';

export const matchWorker = [
  '',
  `mutation ${matchWorkerMutationName}($idRichiesta: Int!, $idLavoratore: Int!){
    ${matchWorkerMutationName}(idRichiesta: $idRichiesta, idLavoratore: $idLavoratore)
    }
`,
matchWorkerMutationName
];
