const unmatchWorkerMutationName = 'unmatchLavoratore';

export const unmatchWorker = [
  '',
  `mutation ${unmatchWorkerMutationName}($idRichiesta: Int!, $idLavoratore: Int!){
    ${unmatchWorkerMutationName}(idRichiesta: $idRichiesta, idLavoratore: $idLavoratore)
    }
`,
unmatchWorkerMutationName
];
