const  SendCandidacyRequestMutationName = 'sendCandidacyRequest';

export const SendCandidacyRequest = [
  '',
  `mutation ${SendCandidacyRequestMutationName}($idLavoratore: Int!) {
    ${SendCandidacyRequestMutationName}(idLavoratore: $idLavoratore) 
  }`,
  SendCandidacyRequestMutationName,
];
