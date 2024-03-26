
const updateFlagsCandidaturaMutationName = 'updateFlagsCandidatura';

export const updateFlagsCandidatura = [
  '',
  `
  mutation ${updateFlagsCandidaturaMutationName}(
    $idUtente: Int!,
    $flags: inputFlagsCandidatura!
  ) {
    ${updateFlagsCandidaturaMutationName}(idUtente: $idUtente, flags: $flags) {
      tata,
      colf,
      badante
    }
  }
  `,
  updateFlagsCandidaturaMutationName,
];

const estraiFlagsCandidaturaQueryName = 'estraiFlagsCandidatura';

export const estraiFlagsCandidaturaQuery = [
  '',
  `
    query ${estraiFlagsCandidaturaQueryName}($idUtente: Int!) {
      ${estraiFlagsCandidaturaQueryName}(idUtente: $idUtente) {
        tata,
        colf,
        badante
      }
    }
  `,
  estraiFlagsCandidaturaQueryName,
];