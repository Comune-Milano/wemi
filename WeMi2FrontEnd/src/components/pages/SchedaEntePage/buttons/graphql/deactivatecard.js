export const deactivateInstitutionCard = [
  '',
  `mutation deactivateInstitutionCard ($input: InputInstitutionCard!, $notes: InputNotes) {
    deactivateInstitutionCard (input: $input, notes: $notes)
  }`,
  'deactivateInstitutionCard',
];
