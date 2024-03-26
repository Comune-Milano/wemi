const  DeleteCandidacyMutationName = 'deleteCandidacy';

export const DeleteCandidacyMutation = [
  '',
  `mutation ${DeleteCandidacyMutationName}($idLavoratore: Int!) {
    ${DeleteCandidacyMutationName}(idLavoratore: $idLavoratore)
  }`,
  DeleteCandidacyMutationName,
];
