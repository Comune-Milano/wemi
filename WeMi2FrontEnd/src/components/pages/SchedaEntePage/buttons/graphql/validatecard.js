export const validateInstitutionCard = [
  '',
  `mutation validateInstitutionCard ($input: InputInstitutionCard!, $notes: InputNotes) {
    validateInstitutionCard (input: $input, notes: $notes)
  }`,
  'validateInstitutionCard',
];
